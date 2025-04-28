export interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  postedDate: Date;
  experience: 'NoExperience' | 'OneToThreeYears' | 'ThreeToFiveYears';
  contractType: 'Permanent' | 'Temporary' | 'Internship';
  profile: string;
  keySkills: string;
  mission: string;
  workingConditions: string;
  domaine:'Security' | 'Data' | 'Cloud' | 'Network' | 'AI' | 'Web' | 'Mobile' | 'Devops' | 'other';
  type:'Onsite' | 'Remote' | 'Hybrid';
  workType: 'FullTime' | 'PartTime' | 'FullTime';
}
