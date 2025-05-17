import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../service/auth.service";
import { registerSchema, loginSchema } from "../schema/auth";

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
