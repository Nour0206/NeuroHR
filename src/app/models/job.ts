export interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  postedDate?: Date;
  profile: string;
  keySkills: string;
  mission: string;
  workingConditions: string;
  experience: string;  // Instead of enum
  contractType: string;
  domaine: string;
  type: string;
  workType: string;
}

