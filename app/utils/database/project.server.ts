import type { Project } from "../models/models";
import { Technology, FeatureImage } from "@prisma/client";
import serverError from "../models/ServerError";
import { prisma } from "./db.server";
import { deleteImageFromCloudinary } from "../fileUpload/fileUpload";
import type { MultiScreenImage } from "~/utils/models/models";

export const getProjects = async () => {
  let projects: any[] = [];
  try {
    projects = await prisma.project.findMany({
      include: {
        technologies: true,
        projectFeatureImages: {
          orderBy: { priority: "asc" },
          include: { multiScreenImages: { orderBy: { priority: "asc" } } },
        },
      },
    });
  } catch (error) {
    throw error;
  }
  return projects.map((project: Project) => {
    const displayImages = project.projectFeatureImages
      .filter((img) => img.showIn === "both" || img.showIn === "carousel")
      .map(
        (img) =>
          img.multiScreenImages?.find((data) => data.priority === "1")?.image
      );
    return { ...project, projectImages: displayImages };
  });
};

export const getAProject = async (id: string) => {
  try {
    return await prisma.project.findFirst({
      where: { id },
      include: {
        technologies: true,
        projectFeatureImages: {
          orderBy: { priority: "asc" },
          include: { multiScreenImages: { orderBy: { priority: "asc" } } },
        },
      },
    });
  } catch (error) {
    throw error;
  }
};

export const createProject = async (projectData: any, creatorId: string) => {
  const connections: { id: string }[] = projectData.technologyIds.map(
    (id: string) => ({ id: id })
  );
  try {
    return await prisma.project.create({
      data: {
        name: projectData.name,
        description: projectData.description,
        detailedDescription: projectData.detailedDescription,
        githubLink: projectData.githubLink,
        secondGitHubLink: projectData.secondGitHubLink,
        demoLink: projectData.demoLink,
        technologies: { connect: connections },
        creatorId: creatorId,
      },
    });
  } catch (error) {
    console.log(error);
  }
  // if (createdProject) {
  //   const { id } = createdProject;
  //   try {
  //     const promises: Promise<any>[] = [];
  //     projectData.projectFeatureImages.forEach((data: any) =>
  //       promises.push(
  //         prisma.featureImage.create({
  //           data: {
  //             image: data.image,
  //             priority: data.priority,
  //             description: data.description,
  //             showIn: data.showIn,
  //             projectId: id,
  //           },
  //         })
  //       )
  //     );
  //     return await Promise.all(promises);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
};

export const deleteFeatureImage = async (id: string) => {
  try {
    return await prisma.featureImage.delete({ where: { id } });
  } catch (error) {
    throw error;
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

export const deleteMultiScreenImage = async (image: any) => {
  try {
    await prisma.multiScreenImage.delete({ where: { id: image.id } });
  } catch (error) {
    throw error;
  }
  try {
    await deleteImageFromCloudinary(image.image);
  } catch (error) {
    throw error;
  }
};

export const createFeatureImage = async (data: any) => {
  try {
    return await prisma.featureImage.create({
      data: {
        priority: data.priority,
        description: data.description,
        showIn: data.showIn,
        Project: { connect: { id: data.projectId! } },
      },
    });
  } catch (error) {
    throw error;
  }
};

export const updateMutiscreenImage = async (data: any) => {
  const { id, ...rest } = data;
  try {
    await prisma.multiScreenImage.update({
      where: { id },
      data: { ...rest },
    });
  } catch (error) {
    throw error;
  }
  if (data.priority === "1") {
    try {
      await updateFeatureImage({ id: data.featureImageId, image: data.image });
    } catch (error) {
      throw error;
    }
  }
};

export const deleteFeatureImageGroup = async (featureImage: any) => {
  try {
    await prisma.featureImage.delete({ where: { id: featureImage.id } });
  } catch (error) {
    throw error;
  }
  const promises: Promise<any>[] = [];
  if (featureImage.multiScreenImages.length > 0) {
    featureImage.multiScreenImages.forEach((img: any) =>
      promises.push(deleteImageFromCloudinary(img.image))
    );
  } else {
    if (featureImage.image) {
      promises.push(deleteImageFromCloudinary(featureImage.image));
    }
  }
  try {
    await Promise.all(promises);
  } catch (error) {
    console.log(error);
  }
};
export const getAFeatureGroupImage = async (id: string) => {
  try {
    return await prisma.featureImage.findFirst({
      where: { id },
      include: { multiScreenImages: true },
    });
  } catch (error) {
    throw error;
  }
};

export const createMultiscreenImage = async (data: any) => {
  let img;
  try {
    img = await prisma.multiScreenImage.create({
      data: {
        image: data.image,
        label: data.label,
        priority: data.priority,
        FeatureImage: { connect: { id: data.featureImageId } },
      },
    });
  } catch (error) {
    throw error;
  }

  if (data.priority === "1") {
    try {
      await updateFeatureImage({ id: data.featureImageId, image: data.image });
    } catch (error) {
      throw error;
    }
  }
  return img;
};

// export const updateMultipleFeatureImages = async (data:any) =>{
//   try {
//     return await prisma.featureImage.updateMany({data:{}})
//   } catch (error) {

//   }
// }

export const editProject = async (changedData: any) => {
  const connections: { id: string }[] = changedData.technologyIds.map(
    (id: string) => ({ id: id })
  );

  try {
    return await prisma.project.update({
      where: { id: changedData.id },
      data: {
        name: changedData.name,
        description: changedData.description,
        detailedDescription: changedData.detailedDescription,
        secondGitHubLink: changedData.secondGitHubLink,
        githubLink: changedData.githubLink,
        demoLink: changedData.demoLink,
        technologies: { connect: connections },
      },
    });
  } catch (error) {
    throw error;
  }
};
