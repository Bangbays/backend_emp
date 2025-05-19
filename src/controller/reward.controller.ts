import { Request, Response, NextFunction } from "express";
import * as rewardService from "../service/reward.service";

export async function getPoints(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as any).user.id;
    const total = await rewardService.getValidPoints(userId);
    res.json({ points: total });
  } catch (error) {
    next(error);
  }
}

export async function getCoupons(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as any).user.id;
    const coupons = await rewardService.getValidCoupons(userId);
    res.json(coupons);
  } catch (error) {
    next(error);
  }
}
