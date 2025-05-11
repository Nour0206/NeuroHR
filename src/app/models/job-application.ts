export type ApplicationStatus = 'Pending' | 'Reviewed' | 'Interviewing' | 'Offered' | 'Rejected';

export interface JobApplication {
  id?: number;
  userId?: string;
  jobPostingId?: number;
  appliedOn?: Date;
  status?: ApplicationStatus; 
  jdMatchPercentage?: number;
  missingKeywords?: string;
  matchingKeywords?: string;
  profileSummary?: string;
}
