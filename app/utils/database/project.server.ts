import type { Project } from "../models/models";
import serverError from "../models/ServerError";
import { prisma } from "./db.server";

export const getProjects = async () => {
  try {
    return await prisma.project.findMany({
      include: { technologies: true, projectFeatureImages: true },
    });
  } catch (error) {
    throw error;
  }
};

export const getAProject = async (id: string) => {
  try {
    return await prisma.project.findFirst({
      where: { id },
      include: { projectFeatureImages: true },
    });
  } catch (error) {
    throw error;
  }
};

export const createProject = async (projectData: any, creatorId: string) => {
  let createdProject;
  try {
    createdProject = await prisma.project.create({
      data: {
        name: projectData.name,
        description: projectData.description,
        detailedDescription: projectData.detailedDescription,
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
  if (createdProject) {
    const { id } = createdProject;
    try {
      const promises: Promise<any>[] = [];
      projectData.projectFeatureImages.forEach((data: any) =>
        promises.push(
          prisma.featureImage.create({
            data: {
              image: data.image,
              priority: data.priority,
              description: data.description,
              showIn: data.showIn,
              projectId: id,
            },
          })
        )
      );
      return await Promise.all(promises);
    } catch (error) {
      console.log(error);
    }
  }
};

export const deleteFeatureImage = async (image: string) => {
  let currentImage;
  try {
    currentImage = await prisma.featureImage.findFirst({ where: { image } });
  } catch (error) {
    throw error;
  }
  if (currentImage) {
    const { id } = currentImage;
    try {
      return await prisma.featureImage.delete({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
};

export const updateFeatureImage = async (changedData: any) => {
  const { id, ...rest } = changedData;
  try {
    return await prisma.featureImage.update({
      where: { id },
      data: { ...rest },
    });
  } catch (error) {
    throw error;
  }
};

export const editProject = async (
  id: string,
  changedData: any,
  featureImages: any,
  remainedImageData: any
) => {
  let promises: Promise<any>[] = [];
  featureImages.forEach((data: any) =>
    promises.push(
      prisma.featureImage.create({
        data: {
          image: data.image,
          priority: data.priority,
          description: data.description,
          showIn: data.showIn,
          projectId: id,
        },
      })
    )
  );
  remainedImageData.forEach((data: any) => {
    promises.push(updateFeatureImage(data));
  });

  try {
    await Promise.all(promises);
  } catch (error) {
    console.log(error);
  }

  let projectFeatureImages;
  try {
    projectFeatureImages = await prisma.featureImage.findMany({
      where: { projectId: id },
    });
  } catch (error) {
    throw error;
  }

  const projectImages = projectFeatureImages
    .filter((image) => image.showIn === "both" || image.showIn === "carousel")
    .map((image) => image.image);

  try {
    return await prisma.project.update({
      where: { id },
      data: {
        name: changedData.name,
        description: changedData.description,
        detailedDescription: changedData.detailedDescription,
        projectImages: projectImages,
        githubLink: changedData.githubLink,
        demoLink: changedData.demoLink,
        technologyIds: changedData.technologyIds,
      },
    });
  } catch (error) {
    throw error;
  }
};
