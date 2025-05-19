import prisma from "../lib/prisma";

export async function applyOrganizer(
  userId: string,
  data: {
    organizationName: string;
    organizationDesc: string;
    organizationAddr: string;
    organizationPhone: string;
  }
) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      role: "PENDING_ORGANIZER",
      organizationName: data.organizationName,
      organizationDesc: data.organizationDesc,
      organizationAddr: data.organizationAddr,
      organizationPhone: data.organizationPhone,
    },
  });

  const user = await prisma.user.update({
    where: { id: userId },
    data: { role: "ORGANIZER" },
  });

  return user;
}
