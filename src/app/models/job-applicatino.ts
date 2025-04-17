export interface Application {
    id?: number;
    candidateName: string;
    email: string;
    phone: string;
    jobId: number;
    resumeUrl: string;
    status: 'pending' | 'reviewed' | 'interviewed' | 'accepted' | 'rejected';
    appliedAt: Date;
  }