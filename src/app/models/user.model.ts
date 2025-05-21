export interface ProfessionalExperience {
  jobTitle: string;
  company: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
}

export interface Certification {
  name: string;
  institution: string;
  year: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;

  professionalExperiences?: ProfessionalExperience[];
  education?: Education[];
  projects?: Project[];
  languages?: string[];
  certifications?: Certification[];
  profileSummary?: string;
}

// Helper type for array fields
export type UserArrayField =
  | 'professionalExperiences'
  | 'education'
  | 'projects'
  | 'languages'
  | 'certifications';
