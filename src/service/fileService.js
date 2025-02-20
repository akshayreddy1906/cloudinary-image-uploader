import { error } from "console";
import { uploadToCloudinary } from "../config/cloudinary.js";
import fs from "fs";

export const cloudinaryUpload = async (file) => {
  try {
    const cloudinaryResponse = await uploadToCloudinary(file);
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
