import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
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
