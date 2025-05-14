export type ApplicationStatus = 'Pending' | 'Reviewed' | 'Interviewing' | 'Offered' | 'Rejected';

export interface JobApplication {
  id?: number;
  userId?: string; // Replace createdBy with userId to match the backend structure
  jobPostingId?: number;
  appliedOn?: Date;
  status?: ApplicationStatus;
  jdMatchPercentage?: number;
  missingKeywords?: string;
  matchingKeywords?: string;
  profileSummary?: string;
  // Optional property to store the fetched username
  userName?: string;
}

