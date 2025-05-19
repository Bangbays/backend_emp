import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { becomeOrganizerSchema } from "../schema/organizer.schema";
import { becomeOrganizer } from "../controller/organizer.controller";
import { authorize } from "../middleware/authorize";

const router = Router();

// Hanya user terautentikasi
router.post(
  "/become",
  authenticate,
  validate(becomeOrganizerSchema),
  becomeOrganizer
);

export default router;
