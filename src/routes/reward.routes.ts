import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { getPoints, getCoupons } from "../controller/reward.controller";

const router = Router();
router.use(authenticate);

router.get("/points", getPoints);
router.get("/coupons", getCoupons);

export default router;
