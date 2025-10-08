const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const ffprobePath = require("ffprobe-static").path;
const { PassThrough } = require("stream");

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

// 获取视频信息
function getVideoInfo(videoPath) {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(videoPath, (err, metadata) => {
            if (err) reject(err);
            resolve(metadata);
        });
    });
}
// 截图展示 返回buffer
async function extractThumbnailBuffer(videoPath) {
    return new Promise((resolve, reject) => {
        const stream = new PassThrough();
        const chunks = [];

        ffmpeg(videoPath)
            .on("error", (err) => reject(err))
            .on("end", () => {
                const buffer = Buffer.concat(chunks);
                resolve(buffer);
            })
            .output(stream)
            .outputOptions(["-vframes 1", "-f image2", "-ss 00:00:01"]) // 截取第一秒
            .run();

        stream.on("data", (chunk) => chunks.push(chunk));
    });
}
// 压缩视频
async function compressVideo(videoPath) {
    return new Promise((resolve, reject) => {});
}
module.exports = { getVideoInfo, extractThumbnailBuffer, compressVideo };
