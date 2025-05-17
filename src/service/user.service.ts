import prisma from "../lib/prisma";
import bcrypt from "bcrypt";

export async function getUserProfile(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
  });
}

export async function updateUserProfile(
  userId: string,
  data: { name: string; bio?: string; profilePictureUrl?: string }
) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      firstName: data.name.split(" ")[0],
      lastName: data.name.split(" ").slice(1).join(" "),
      bio: data.bio,
      profilePictureUrl: data.profilePictureUrl,
    },
  });
}

export async function changeUserPassword(
  userId: string,
  oldPwd: string,
  newPwd: string
) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User tidak ditemukan");
  const valid = await bcrypt.compare(oldPwd, user.passwordHash);
  if (!valid) throw new Error("Password lama salah");
  const hash = await bcrypt.hash(newPwd, 10);
  return prisma.user.update({
    where: { id: userId },
    data: { passwordHash: hash },
  });
}
