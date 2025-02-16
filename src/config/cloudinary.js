import { v2 as cloudinary } from "cloudinary";

export const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};


export const uploadToCloudinary = async (filePath) => {
  try {
    cloudinaryConfig();
    const result = await cloudinary.uploader.upload(filePath);
    return result;
  } catch (error) {
    console.error(error);
  }
};