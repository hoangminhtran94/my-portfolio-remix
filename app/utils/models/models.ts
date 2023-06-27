export interface Technology {
  id: string;
  name: string;
  backgroundColor: string;
  textColor: string;
  icon: string;
  creatorId?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  projectImages: string[];
  projectFeatureImages: FeatureImage[];
  githubLink: string;
  secondGitHubLink?: string;
  demoLink: string;
  technologies: Technology[];
  technologyIds: string[];
}

export interface User {
  id: string;
  name: string;
  username: string;
  secondaryEmail: string;
  profileImage: string;
  firstLineAbout: string;
  secondLineAbout: string;
  thirdLineAbout: string;
  socialMedias: SocialMedia[];
  password?: string;
  projects?: Project[];
  technologies?: Technology[];
}

export interface SocialMedia {
  id: string;
  name: string;
  link: string;
  icon: string;
  ownerId?: string;
  owner?: User;
}

export interface FeatureImage {
  id?: string;
  image?: string;
  label?: string;
  group?: string;
  multiScreenImages?: MultiScreenImage[];
  priority: string;
  description: string;
  showIn: "carousel" | "detail" | "both";
}

export interface TechnologyType {
  id: string;
  name: string;
  TechnologyCategory: TechnologyCategory[];
}
export interface MultiScreenImage {
  id?: string;
  file?: File | null;
  priority: string;
  label: string;
  image: string;
  featureImageId?: string;
}

export interface TechnologyCategory {
  id: string;
  name: string;
  type: TechnologyType;
  TechnologyGroup: TechnologyGroup[];
  technologyTypeId: string;
}
export interface TechnologyGroup {
  id: string;
  category: TechnologyCategory;
  priority: number;
  technologies: Technology[];
  technologiesIds: string[];
  technologyCategoryId: string;
}
