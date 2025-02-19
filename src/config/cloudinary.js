import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";
export const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

export const gernerateSignature = (paramsToSign) => {
  const { api_secret } = cloudinary.config();
  const sortedParams = Object.keys(paramsToSign)
    .sort()
    .map((key) => `${key}=${paramsToSign[key]}`)
    .join("&");
    const signature = crypto
    .createHash("sha256")
    .update(sortedParams + api_secret)
    .digest("hex");
  return signature;
};
export const uploadToCloudinary = async (filePath) => {
  try {
    cloudinaryConfig();
    const timestamp = Math.round(new Date().getTime() / 1000);
    const paramsToSign = {
      timestamp,
    };  
    const signature = gernerateSignature(paramsToSign);
    const result = await cloudinary.uploader.upload(filePath, {
      ...paramsToSign,
      signature,
      api_key: process.env.CLOUDINARY_API_KEY,
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};
