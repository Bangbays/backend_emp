import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { uploadToCloudinary } from "../utils/cloudinary";
import * as userService from "../service/user.service";

export async function getProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await userService.getUserProfile(req.user!.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function editProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data: any = req.body;
    if (req.file) {
      const url = await uploadToCloudinary(req.file.path);
      data.profilePictureUrl = url;
    }
    const updated = await userService.updateUserProfile(req.user!.id, data);
    res.json(updated);
  } catch (error) {
    next(error);
  }
}

export async function changePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await userService.changeUserPassword(
      req.user!.id,
      req.body.oldPassword,
      req.body.newPassword
    );
    res.json({ message: "Password berhasil diganti" });
  } catch (error) {
    next(error);
  }
}
