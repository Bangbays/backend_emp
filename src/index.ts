import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { PORT } from "./config";
import authRouter from "./routes/auth.routes";

const port = PORT || 9000;
const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server sudah dimulai di port ${port}`);
});
