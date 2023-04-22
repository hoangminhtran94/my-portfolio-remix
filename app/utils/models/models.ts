export interface Technology {
  id: string;
  name: string;
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
  password?: string;
  projects?: Project[];
  technologies?: Technology[];
}
