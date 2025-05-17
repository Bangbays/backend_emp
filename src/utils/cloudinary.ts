import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET } from "../config";

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

export async function uploadToCloudinary(filepath: string) {
  const res = await cloudinary.uploader.upload(filepath, {
    folder: "avatars",
  });
  return res.secure_url;
}
