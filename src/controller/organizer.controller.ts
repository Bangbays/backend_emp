import { Request, Response, NextFunction } from "express";
import { applyOrganizer } from "../service/organizer.service";

export async function becomeOrganizer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as any).user.id;
    const data = req.body;
    const user = await applyOrganizer(userId, data);
    res.json({ message: "Anda sekarang Organizer", user });
  } catch (err) {
    next(err);
  }
}
