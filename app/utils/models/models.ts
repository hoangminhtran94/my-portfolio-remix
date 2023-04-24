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
  projectImages: string[];
  githubLink: string;
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
