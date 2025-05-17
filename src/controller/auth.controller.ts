import { Request, Response, NextFunction } from "express";
import {
  registerUser,
  loginUser,
  requestPasswordReset,
  resetPasswordService,
} from "../service/auth.service";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await registerUser(req.body);
    res.status(201).send({ message: "Register success", data });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);
    res
      .status(201)
      .send({ message: "Login success", user: data.user, token: data.token });
  } catch (error) {
    next(error);
  }
}

export async function forgotPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await requestPasswordReset(req.body.email);
    res.json({ message: "Jika email terdaftar, link reset telah dikirim" });
  } catch (error) {
    next(error);
  }
}

export async function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await resetPasswordService(req.params.token, req.body.newPassword);
    res.json({ message: "Password berhasil direset" });
  } catch (error) {
    next(error);
  }
}
