const { uploadToCloudinary } = require("../config/cloudinary.js");
const fs = require("fs");

const cloudinaryUpload = async (file) => {
  try {
    const cloudinaryResponse = await uploadToCloudinary(file.path);
    fs.unlink(file.path, (error) => {
      if (error) {
        console.log(error);
      }
    });
    return cloudinaryResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
module.exports = {cloudinaryUpload}