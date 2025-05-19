import cron from "node-cron";
import prisma from "../lib/prisma";

cron.schedule("0 0 * * *", async () => {
  await prisma.userPointBatch.deleteMany({
    where: { expiresAt: { lt: new Date() } },
  });
  await prisma.coupon.deleteMany({ where: { expiresAt: { lt: new Date() } } });
  console.log("Cleanup expired points & coupons");
});
