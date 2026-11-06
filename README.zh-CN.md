# my-vuepress-site

网站使用 [vuepress](https://vuepress.vuejs.org/) 和 [vuepress-theme-plume](https://github.com/pengzhanbo/vuepress-theme-plume) 构建生成。

## Install

```sh
npm i
```

## Usage

英文文章放在 `docs/en/`，目录结构与中文一致，permalink 使用中文地址加 `/en` 前缀。新增或修改中文文章时，同步完整英文正文、日期、封面、标签和内部链接。完成翻译同步后再更新 `sourceHash`；它是中文源文件统一为 LF 换行后的 SHA-256。英文导航和侧边栏标签维护在 `docs/.vuepress` 与 `scripts/locale-labels.mjs` 中。

运行 `npm run docs:check-locales` 检查文章覆盖、译文是否过期、元数据、未翻译正文，以及标题、代码块和图片数量。生产构建会自动执行此检查。

英文旅行页面还通过 `sourceDependenciesHash` 校验共享旅行组件及城市、照片数据。修改这些内容后，同步英文词典，再使用 `scripts/check-locales.mjs` 导出的 `translationDependencyHash` 更新该值。

```sh
# 启动开发服务
npm run docs:dev
# 构建生产包
npm run docs:build
# 本地预览生产服务
npm run docs:preview
# 更新 vuepress 和主题
npm run vp-update
```

## 部署到 GitHub Pages

主题已创建 github actions: `.github/workflows/docs-deploy.yml`，你还需要在 github 仓库中进行以下设置：

- [ ] `settings > Actions > General`，拉到页面底部，在 `Workflow permissions` 下，勾选 `Read and write permissions`，并点击保存按钮

- [ ] `settings > Pages`, 在 `Build and deployment` 中，`Source` 选择 `Deploy from a branch`, `Branch` 选择 `gh-pages`，并点击保存按钮
  (首次创建可能没有 `gh-pages`分支，你可以先完成上面的设置后，推送一次代码到主分支，等待 `github actions` 完成后再进行设置)

- [ ] 修改 `docs/.vuepress/config.ts` 中的 `base` 选项：
  - 如果你准备发布到 `https://<USERNAME>.github.io/` ，你可以省略这一步，因为 `base` 默认就是 `"/"` 。
  - 如果你准备发布到 `https://<USERNAME>.github.io/<REPO>/` ，也就是说你的仓库地址是 `https://github.com/<USERNAME>/<REPO>` ，则将 `base` 设置为 `"/<REPO>/"`。

如需要自定义域名，请查看 [Github Pages 文档](https://docs.github.com/zh/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)

## 文档

- [vuepress](https://vuepress.vuejs.org/)
- [vuepress-theme-plume](https://theme-plume.vuejs.press/)
