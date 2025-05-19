import prisma from "../lib/prisma";
import { addMonths } from "date-fns";

export async function createPointBatch(userId: string, points: number) {
  return prisma.userPointBatch.create({
    data: {
      userId,
      points,
      expiresAt: addMonths(new Date(), 3),
    },
  });
}

export async function getValidPoints(userId: string): Promise<number> {
  const batches = await prisma.userPointBatch.findMany({
    where: { userId, expiresAt: { gt: new Date() } },
  });
  return batches.reduce((sum, b) => sum + b.points, 0);
}

export async function getValidCoupons(userId: string) {
  return prisma.coupon.findMany({
    where: {
      userId,
      isUsed: false,
      expiresAt: { gt: new Date() },
    },
    orderBy: { expiresAt: "asc" },
  });
}
