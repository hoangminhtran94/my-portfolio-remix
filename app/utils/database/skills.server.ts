import { prisma } from "./db.server";

export const createSkillGroup = async (
  technologyCategoryId: string,
  priority: number,
  technologyIds: string[]
) => {
  let connections: { id: string }[] = technologyIds.map((id) => ({ id: id }));

  try {
    return await prisma.technologyGroup.create({
      data: {
        technologyCategoryId: technologyCategoryId,
        priority: +priority,
        technologiesIds: technologyIds,
        technologies: { connect: connections },
      },
    });
  } catch (error) {
    throw error;
  }
};

export const updateSkillGroup = async (
  groupId: string,
  technologyCategoryId: string,
  priority: number,
  technologyIds: string[]
) => {
  let currentGroup;
  try {
    currentGroup = await prisma.technologyGroup.findFirst({
      where: { id: groupId },
    });
  } catch (error) {
    throw error;
  }
  const currentTechnologyids = currentGroup!.technologiesIds;
  const deletedTechnologies = currentTechnologyids.filter(
    (tech) => !technologyIds.includes(tech)
  );
  const newTechnologies = technologyIds.filter(
    (tech) => !deletedTechnologies.includes(tech)
  );

  let connections: { id: string }[] = newTechnologies.map((id) => ({ id: id }));
  let disconnections: { id: string }[] = deletedTechnologies.map((id) => ({
    id: id,
  }));

  const promises2: Promise<any>[] = [];
  deletedTechnologies.forEach((id: string) => {
    promises2.push(
      prisma.technology.update({
        where: { id: id },
        data: { technologyGroups: { disconnect: { id: groupId } } },
      })
    );
  });
  try {
    await Promise.all(promises2);
  } catch (error) {
    console.log(error);
  }

  try {
    return await prisma.technologyGroup.update({
      where: { id: groupId },
      data: {
        priority: +priority,
        technologyCategoryId: technologyCategoryId,
        technologiesIds: technologyIds,
        technologies: { connect: connections, disconnect: disconnections },
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getTechnologyTypes = async () => {
  try {
    return await prisma.technologyType.findMany();
  } catch (error) {
    return [];
  }
};

export const getTechnologyCategories = async () => {
  try {
    return await prisma.technologyCategory.findMany({
      include: { type: true },
    });
  } catch (error) {
    return [];
  }
};

export const createTechnologyCategory = async (formdata: any) => {
  try {
    await prisma.technologyCategory.create({
      data: { name: formdata.name, technologyTypeId: formdata.typeId },
    });
  } catch (error) {
    throw error;
  }
};

export const getTechnologyGroups = async (typeId: string) => {
  try {
    return await prisma.technologyGroup.findMany({
      where: { category: { technologyTypeId: typeId } },
      include: { technologies: true, category: true },
    });
  } catch (error) {
    return [];
  }
};
