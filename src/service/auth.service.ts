import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { v4 as uuid } from "uuid";
import { addHours } from "date-fns";
import nodemailer from "nodemailer";
import {
  MAILTRAP_HOST,
  MAILTRAP_PASS,
  MAILTRAP_PORT,
  MAILTRAP_USER,
} from "../config";
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export async function registerUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const hash = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      passwordHash: hash,
    },
  });
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "3d" });
  return { user, token };
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Email atau password salah");
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error("Email atau password salah");
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "3d" });
  return { user, token };
}

const transporter = nodemailer.createTransport({
  host: MAILTRAP_HOST,
  port: Number(MAILTRAP_PORT),
  auth: {
    user: MAILTRAP_USER!,
    pass: MAILTRAP_PASS!,
  },
});

export async function requestPasswordReset(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return;

  const token = uuid();
  const expiresAt = addHours(new Date(), 1);
  await prisma.passwordResetToken.create({
    data: { userId: user.id, token, expiresAt },
  });

  const resetLink = `http://localhost:3000/reset-password/${token}`;
  await transporter.sendMail({
    to: user.email,
    from: "no-reply@eventapp.com",
    subject: "Reset Password",
    html: `<p>Silahkan klik <a href="${resetLink}">tautan ini</a> untuk reset password.</p>`,
  });
}

export async function resetPasswordService(token: string, newPassword: string) {
  const record = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { user: true },
  });
  if (!record || record.expiresAt < new Date()) {
    throw new Error("Token tidak valid atau sudah kadaluwarsa");
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: record.userId },
    data: { passwordHash },
  });
  await prisma.passwordResetToken.delete({ where: { id: record.id } });
}
