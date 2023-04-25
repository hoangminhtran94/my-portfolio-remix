import type { Project } from "../models/models";
import serverError from "../models/ServerError";
import { prisma } from "./db.server";

export const getProjects = async () => {
  try {
    return await prisma.project.findMany({ include: { technologies: true } });
  } catch (error) {
    throw error;
  }
};

export const getAProject = async (id: string) => {
  try {
    return await prisma.project.findFirst({ where: { id } });
  } catch (error) {
    throw error;
  }
};

export const createProject = async (projectData: any, creatorId: string) => {
  try {
    return await prisma.project.create({
      data: {
        name: projectData.name,
        description: projectData.description,
        projectImages: projectData.projectImages,
        githubLink: projectData.githubLink,
        demoLink: projectData.demoLink,
        technologyIds: projectData.technologyIds,
        creatorId: creatorId,
      },
      include: {
        technologies: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const editProject = async (id: string, changedData: any) => {
  try {
    return await prisma.project.update({
      where: { id },
      data: { ...changedData },
    });
  } catch (error) {
    throw error;
  }
};
