#!/usr/bin/env python3
"""Reproduce the blog's toy Transformer using Python's standard library.

Default output is a six-decimal walkthrough; --json preserves float precision.
Full causal recomputation and an independent KV-cache
path are compared for every processed position after each of three calls.
All arithmetic uses Python float (normally IEEE 754 binary64); only display
consumers should round values. Dense FLOP estimates deliberately count the
toy matrices as dense, despite their hand-selected zero/identity entries.
"""

import argparse
import json
import math

TOKENS = ["我", "爱", "你", "<eos>", "学习"]
E = [[1., 0., 0., 0.], [0., 1., 1., 0.], [0., 0., 1., 1.],
     [1., -1., 0., 0.], [0., 0., 0., 1.]]
EPS = 1e-5
WQ = [
    [[1., 0.], [0., 1.], [0., 0.], [0., 0.]],
    [[0., 0.], [0., 0.], [1., 0.], [0., 1.]],
]
WK = [
    [[0., 1.], [1., 0.], [0., 0.], [0., 0.]],
    [[0., 0.], [0., 0.], [0., 1.], [1., 0.]],
]
WV = [
    [[1., 0.], [0., 2.], [0., 0.], [0., 0.]],
    [[0., 0.], [0., 0.], [1., 0.], [0., 2.]],
]
WO = [[float(i == j) for j in range(4)] for i in range(4)]
W1 = [[1., 0., -1.], [0., 1., 0.], [1., 0., 1.], [0., -1., 0.]]
W2 = [[1., 0., 0., 1.], [0., 1., 0., 0.], [0., 0., 1., -1.]]


def dot(x, y):
    return sum(a * b for a, b in zip(x, y))


def vecmat(x, matrix):
    assert len(x) == len(matrix)
    return [dot(x, col) for col in zip(*matrix)]


def softmax(x):
    maximum = max(x)
    shifted = [math.exp(v - maximum) for v in x]
    total = sum(shifted)
    return [v / total for v in shifted]


def layernorm(x):
    mean = sum(x) / len(x)
    variance = sum((v - mean) ** 2 for v in x) / len(x)
    return [(v - mean) / math.sqrt(variance + EPS) for v in x], mean, variance


def embedding(token_id, position_zero_based):
    p = position_zero_based
    position = [math.sin(p), math.cos(p), math.sin(p / 100), math.cos(p / 100)]
    return [a + b for a, b in zip(E[token_id], position)]


def finish_block(x, heads):
    concat = heads[0]["o"] + heads[1]["o"]
    o = vecmat(concat, WO)
    residual = [a + b for a, b in zip(x, o)]
    u, ln1_mean, ln1_variance = layernorm(residual)
    ff_pre = vecmat(u, W1)
    g = [max(0., v) for v in ff_pre]
    f = vecmat(g, W2)
    residual2 = [a + b for a, b in zip(u, f)]
    h, ln2_mean, ln2_variance = layernorm(residual2)
    logits = [dot(h, row) for row in E]
    probabilities = softmax(logits)
    return {
        "X": x, "heads": heads, "concat": concat, "O": o,
        "R": residual, "LN1_mean": ln1_mean, "LN1_variance": ln1_variance,
        "U": u, "UW1": ff_pre, "G": g, "F": f,
        "U_plus_F": residual2, "LN2_mean": ln2_mean,
        "LN2_variance": ln2_variance, "H": h,
        "logits": logits, "probs": probabilities,
        "selected_token": TOKENS[max(range(len(probabilities)), key=probabilities.__getitem__)],
    }


def full_forward(token_ids):
    """Recompute Q/K/V for all positions, then every causal attention row."""
    xs = [embedding(token_id, p) for p, token_id in enumerate(token_ids)]
    q_all = [[vecmat(x, WQ[head]) for x in xs] for head in range(2)]
    k_all = [[vecmat(x, WK[head]) for x in xs] for head in range(2)]
    v_all = [[vecmat(x, WV[head]) for x in xs] for head in range(2)]
    outputs = []
    for p, x in enumerate(xs):
        heads = []
        for head in range(2):
            q = q_all[head][p]
            scores = [dot(q, k) / math.sqrt(2) for k in k_all[head][:p+1]]
            alpha = softmax(scores)
            o = vecmat(alpha, v_all[head][:p+1])
            heads.append({"q": q, "k": k_all[head][p], "v": v_all[head][p],
                          "scores": scores, "alpha": alpha, "o": o})
        outputs.append(finish_block(x, heads))
    return outputs, k_all, v_all


def new_cache():
    # Explicit layer dimension. This model has one layer and two heads.
    return [{"heads": [{"K": [], "V": []} for _ in range(2)]}]


def incremental_forward(token_id, position_zero_based, cache):
    """Only project the new position, and read saved K/V for both heads."""
    x = embedding(token_id, position_zero_based)
    heads = []
    for head in range(2):
        storage = cache[0]["heads"][head]
        assert len(storage["K"]) == position_zero_based
        q, k, v = (vecmat(x, matrices[head]) for matrices in (WQ, WK, WV))
        storage["K"].append(k)
        storage["V"].append(v)
        scores = [dot(q, past_k) / math.sqrt(2) for past_k in storage["K"]]
        alpha = softmax(scores)
        o = vecmat(alpha, storage["V"])
        heads.append({"q": q, "k": k, "v": v,
                      "scores": scores, "alpha": alpha, "o": o})
    return finish_block(x, heads)


def max_error(a, b):
    assert len(a) == len(b)
    return max(abs(x - y) for x, y in zip(a, b))


def build_report():
    ids = [0, 1]
    cache = new_cache()
    # Prefill uses the full causal path once and stores its projected K/V.
    cached_rows, ks, vs = full_forward(ids)
    for head in range(2):
        cache[0]["heads"][head]["K"] = [row[:] for row in ks[head]]
        cache[0]["heads"][head]["V"] = [row[:] for row in vs[head]]
    traces = []
    errors = []
    outputs = []
    article_probabilities = [
        [0.106726, 0.511078, 0.107480, 0.021253, 0.253463],
        [0.063432, 0.162082, 0.206430, 0.026439, 0.541617],
        [0.057395, 0.022791, 0.321742, 0.151722, 0.446349],
    ]
    for step in range(3):
        if step:
            ids.append(TOKENS.index(outputs[-1]))
            cached_rows.append(incremental_forward(ids[-1], len(ids)-1, cache))
        full_rows, full_k, full_v = full_forward(ids)
        for p, (full, cached) in enumerate(zip(full_rows, cached_rows)):
            for field in ("X", "concat", "O", "R", "U", "UW1", "G", "F", "U_plus_F", "H", "logits", "probs"):
                error = max_error(full[field], cached[field])
                errors.append(error)
                assert error < 1e-12, (step, p, field, error)
        for head in range(2):
            for field, expected in (("K", full_k[head]), ("V", full_v[head])):
                actual = cache[0]["heads"][head][field]
                for row1, row2 in zip(actual, expected):
                    assert max_error(row1, row2) < 1e-12
        selected = cached_rows[-1]["selected_token"]
        assert max_error(cached_rows[-1]["probs"], article_probabilities[step]) <= 0.5e-6
        outputs.append(selected)
        traces.append({"call": step + 1, "input": [TOKENS[t] for t in ids],
                       "cache_length": len(ids), "output_token": selected,
                       "new_position_traces": cached_rows[:] if step == 0 else [cached_rows[-1]],
                       "last_position_full_logits": full_rows[-1]["logits"],
                       "last_position_cached_logits": cached_rows[-1]["logits"],
                       "last_position_full_probs": full_rows[-1]["probs"],
                       "last_position_cached_probs": cached_rows[-1]["probs"],
                       "cache": json.loads(json.dumps(cache))})
    assert outputs == ["爱", "学习", "学习"], outputs
    a = 8 * 4**2 + 4 * 4 * 3
    costs = []
    for step, s in enumerate((2, 3, 4)):
        full_projection, full_ff, full_attention = 8*s*4**2, 4*s*4*3, 4*s*s*4
        inc_projection = full_projection if step == 0 else 8*4**2
        inc_ff = full_ff if step == 0 else 4*4*3
        inc_attention = full_attention if step == 0 else 4*s*4
        costs.append({"call": step+1, "s": s,
                      "full_projection": full_projection, "full_ff": full_ff,
                      "full_attention": full_attention,
                      "full_total": full_projection+full_ff+full_attention,
                      "cached_projection": inc_projection, "cached_ff": inc_ff,
                      "cached_attention": inc_attention,
                      "cached_total": inc_projection+inc_ff+inc_attention,
                      "last_position_vocab_projection_each_path": 2*4*5})
    # Demonstrate exact softmax recombination over two physical blocks.
    # Logical tokens 1..2 and 3..4 may live in any physical block locations.
    last_head = cached_rows[-1]["heads"][0]
    values = cache[0]["heads"][0]["V"]
    block_summaries = []
    for start in (0, 2):
        scores = last_head["scores"][start:start+2]
        mu = max(scores)
        unnormalized = [math.exp(score - mu) for score in scores]
        z = sum(unnormalized)
        u = vecmat(unnormalized, values[start:start+2])
        block_summaries.append({"token_positions": [start+1, start+2],
                                "scores": scores, "mu": mu, "Z": z, "U": u})
    global_mu = max(block["mu"] for block in block_summaries)
    scales = [math.exp(block["mu"]-global_mu) for block in block_summaries]
    denominator = sum(scale*block["Z"] for scale, block in zip(scales, block_summaries))
    numerator = [sum(scale*block["U"][coordinate] for scale, block in zip(scales, block_summaries))
                 for coordinate in range(2)]
    merged = [v / denominator for v in numerator]
    assert max_error(merged, last_head["o"]) < 1e-12
    report = {"model": {"N": 1, "d": 4, "h": 2, "d_h": 2, "d_ff": 3,
                         "vocabulary": TOKENS, "epsilon": EPS, "a": a,
                         "E": E, "WQ": WQ, "WK": WK, "WV": WV,
                         "WO": WO, "W1": W1, "W2": W2,
                         "W_vocab": list(map(list, zip(*E)))},
              "calls": traces,
              "verification": {"max_abs_error_full_vs_cache": max(errors),
                               "generated_tokens": outputs,
                               "final_cache_length": len(ids),
                               "final_output_sequence_length": len(ids)+1},
              "dense_flop_estimates": costs,
              "dense_flop_total_full": sum(c["full_total"] for c in costs),
              "dense_flop_total_cached": sum(c["cached_total"] for c in costs),
              "fp32_cache_bytes_per_token": 2*1*2*2*4,
              "fp32_cache_bytes_by_length": {str(s): 2*1*2*2*4*s for s in (2, 3, 4)},
              "blocked_attention_position4_head1": {
                  "block_size": 2, "blocks": block_summaries,
                  "global_mu": global_mu, "rescale_factors": scales,
                  "global_Z": denominator, "global_U": numerator,
                  "merged_output": merged, "direct_output": last_head["o"],
                  "max_abs_error": max_error(merged, last_head["o"])}}
    return report


def format_value(value):
    if isinstance(value, list):
        return "[" + ", ".join(format_value(x) for x in value) + "]"
    if isinstance(value, float):
        return f"{value:.6f}"
    return str(value)


def print_walkthrough(report):
    print("Toy model: N=1, d=4, h=2, d_h=2, d_ff=3, vocab=5, LN epsilon=1e-5")
    print("Numbers are displayed to six decimals; calculations use unrounded Python floats.")
    print("Use --json for all parameters, every processed position and complete cache contents.")
    for call in report["calls"]:
        print(f"\nCALL {call['call']}: {' '.join(call['input'])} -> {call['output_token']}")
        length = call["cache_length"]
        print(f"  Cache: {length} positions, {32*length} bytes if stored as FP32")
        trace = call["new_position_traces"][-1]
        print(f"  Last processed position {length}; X={format_value(trace['X'])}")
        for head_index, head in enumerate(trace["heads"], 1):
            print(f"  Head {head_index}: q={format_value(head['q'])}, k={format_value(head['k'])}, v={format_value(head['v'])}")
            print(f"    scores={format_value(head['scores'])}, alpha={format_value(head['alpha'])}")
            print(f"    o={format_value(head['o'])}")
        for key in ("O", "R", "U", "G", "F", "H", "logits", "probs"):
            print(f"  {key}: {format_value(trace[key])}")
        error = max_error(call["last_position_full_probs"], call["last_position_cached_probs"])
        cost = report["dense_flop_estimates"][call["call"]-1]
        print(f"  Full vs cache probability max error: {error:.3e}")
        print(f"  Dense block FLOPs: full={cost['full_total']}, cached={cost['cached_total']}")
    print("\nVerification:", report["verification"])
    print("\nDense FLOP estimates exclude norms, softmax and vocabulary head (40 FLOPs/call).")
    print("Full total:", report["dense_flop_total_full"], "Cached total:", report["dense_flop_total_cached"])
    print("FP32 cache bytes per token:", report["fp32_cache_bytes_per_token"])
    print("FP32 cache bytes by length:", report["fp32_cache_bytes_by_length"])
    print("\nPosition 4, head 1, two-block attention:")
    block_report = report["blocked_attention_position4_head1"]
    for block in block_report["blocks"]:
        print("  Block", block["token_positions"])
        for key in ("scores", "mu", "Z", "U"):
            print(f"    {key}: {format_value(block[key])}")
    for key, value in block_report.items():
        if key != "blocks":
            print(f"  {key}: {format_value(value)}")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--json", action="store_true", help="print the full-precision machine-readable report")
    args = parser.parse_args()
    report = build_report()
    if args.json:
        print(json.dumps(report, ensure_ascii=False, indent=2))
    else:
        print_walkthrough(report)


if __name__ == "__main__":
    main()
