const fileTypeValidator = (file) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype); //'image/png'
  return extname && mimetype;
};
module.exports = { fileTypeValidator };
