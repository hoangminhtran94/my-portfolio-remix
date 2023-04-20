export interface Technology {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  projectImages: string[];
  link: string;
  technologies: Technology[];
}
