import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

export const authenticate: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token tidak ditemukan" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    (req as any).user = { id: payload.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Token tidak valid" });
    return;
  }
};
