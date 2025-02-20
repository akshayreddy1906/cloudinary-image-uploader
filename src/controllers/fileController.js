const { cloudinaryUpload } = require("../service/fileService.js");

const fileController = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ error: "File not present in request" });
    }
    if (Array.isArray(req.files) && req.files.length === 0)
      return res.status(400).json({ error: "No file uploaded" });
    const file = req.files[0];
    const result = await cloudinaryUpload(file);
    res
      .status(200)
      .json({ message: "File uploaded successfully", uploadResult: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { fileController };
