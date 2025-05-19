import "./utils/cron";

import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { PORT } from "./config";
import authRouter from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";
import rewardRoutes from "./routes/reward.routes";
import errorHandler from "./middleware/error.middleware";

const port = PORT || 9000;
const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/profile", profileRoutes);
app.use("/rewards", rewardRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server sudah dimulai di port ${port}`);
});
