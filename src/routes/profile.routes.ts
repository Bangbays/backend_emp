import { Router } from "express";
import multer from "multer";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import {
  updateProfilSchema,
  changePasswordSchema,
} from "../schema/profile.schema";
import {
  getProfile,
  editProfile,
  changePassword,
} from "../controller/profile.controller";

const upload = multer({ dest: "uploads/" });
const router = Router();

router.use(authenticate);
router.get("/", getProfile);
router.put(
  "/",
  upload.single("avatar"),
  validate(updateProfilSchema),
  editProfile
);
router.put("/change-password", validate(changePasswordSchema), changePassword);

export default router;
