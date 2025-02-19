const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const imageResize = async (req, res, next) => {
  try {
    const orginalFilePath = req.file[0].path;
    const parsedPath = path.parse(orginalFilePath);
    const outputFilePath = path.join(
      parsedPath.dir,
      "resized-" + parsedPath.name + "jpeg"
    );
    await sharp(orginalFilePath)
      .resize({ width: 1500 })
      .jpeg({
        quality: 100,
        mozjpeg: true,
        chromaSubsampling: "4:4:4",
        trellisQuantisation: "true",
        overshootDeringing: "true",
        optimiseScans: "true",
        progressive: "true",
      })
      .toFile(outputFilePath);
    req.file[0].path = outputFilePath;
    req.orginalFilePath = originalFilePath;
    next();
  } catch (error) {
    return res.status(500).json({ error: { description: error.message } });
  }
};
module.exports = {imageResize};