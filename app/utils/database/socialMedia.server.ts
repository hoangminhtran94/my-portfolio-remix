import { prisma } from "./db.server";

export const addASocialMedia = async (ownerId: string, data: any) => {
  try {
    return await prisma.socialMedia.create({
      data: { ...data, ownerId: ownerId },
    });
  } catch (error) {
    throw error;
  }
};

export const getASocialMedia = async (id: string) => {
  try {
    return await prisma.socialMedia.findFirst({ where: { id } });
  } catch (error) {
    throw error;
  }
};

export const updateASocialMedia = async (id: string, data: any) => {
  try {
    return await prisma.socialMedia.update({
      where: { id },
      data: { ...data },
    });
  } catch (error) {
    throw error;
  }
};
