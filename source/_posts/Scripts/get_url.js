function generateTimestampUrl() {
    var timestamp = Math.round(new Date() / 1000);
    var url = timestamp.toString(36)
    return url;
}
module.exports = generateTimestampUrl;