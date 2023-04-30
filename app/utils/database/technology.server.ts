import { prisma } from "./db.server";
export const createATechnology = async (userId: string, technology: any) => {
  try {
    return await prisma.technology.create({
      data: {
        name: technology.name,
        backgroundColor: technology.backgroundColor,
        textColor: technology.textColor,
        icon: technology.icon,
        creatorId: userId,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getTechnologies = async () => {
  try {
    return await prisma.technology.findMany();
  } catch (error) {
    throw error;
  }
};

export const getATechnology = async (id: string) => {
  try {
    return await prisma.technology.findFirst({ where: { id } });
  } catch (error) {
    throw error;
  }
};

export const updateTechnology = async (id: string, data: any) => {
  try {
    return await prisma.technology.update({ where: { id }, data: { ...data } });
  } catch (error) {
    throw error;
  }
};
