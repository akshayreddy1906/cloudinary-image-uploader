const isFilePresent = (req, res, next) => {
  if (!req.files) {
    return res.status(400).json({
      error: "File not present in request",
    });
  }
  if (Array.isArray(req.files) && req.files.length === 0) {
    return res.status(400).json({
      error: "No file uploaded",
    });
  }
  next();
};
module.exports = { isFilePresent };
