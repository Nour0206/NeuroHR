import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { JobService } from '../../../../services/job.service';
import { CommonModule } from '@angular/common';
import { Job } from '../../../../models/job';
import { AuthService } from '../../../../services/auth.service';

// Define enum-like types for better type safety
type ExperienceLevel = 'NoExperience' | 'OneToThreeYears' | 'ThreeToFiveYears';
type ContractType = 'Permanent' | 'Temporary' | 'Internship';
type WorkType = 'FullTime' | 'PartTime';
type JobType = 'Onsite' | 'Remote' | 'Hybrid';
type Domain = 'Security' | 'Data' | 'Cloud' | 'Network' | 'AI' | 'Web' | 'Mobile' | 'DevOps' | 'Other';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class JobDetailsComponent implements OnInit {
  job?: Job;
  isLoading = true;
  error: string | null = null;
  userRole: string = '';

  // Properly typed mapping objects
  readonly experienceLevels: Record<ExperienceLevel, string> = {
    NoExperience: 'No Experience',
    OneToThreeYears: '1-3 Years',
    ThreeToFiveYears: '3-5 Years'
  };

  readonly contractTypes: Record<ContractType, string> = {
    Permanent: 'Permanent',
    Temporary: 'Temporary',
    Internship: 'Internship'
  };

  readonly workTypes: Record<WorkType, string> = {
    FullTime: 'Full Time',
    PartTime: 'Part Time'
  };

  readonly jobTypes: Record<JobType, string> = {
    Onsite: 'Onsite',
    Remote: 'Remote',
    Hybrid: 'Hybrid'
  };

  readonly domains: Record<Domain, string> = {
    Security: 'Security',
    Data: 'Data',
    Cloud: 'Cloud',
    Network: 'Network',
    AI: 'AI',
    Web: 'Web',
    Mobile: 'Mobile',
    DevOps: 'DevOps',
    Other: 'Other'
  };
  userIsHR: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const jobId = this.route.snapshot.paramMap.get('id');
    if (!jobId || isNaN(+jobId)) {
      this.error = 'Invalid job ID';
      this.isLoading = false;
      const userInfo = this.authService.getUserInfo();
      if (userInfo && userInfo.roles) {
        console.log('User Roles:', userInfo.roles); // Debugging log
        this.userRole = userInfo.roles.includes('HR') ? 'HR' : 'User';
    }
      this.userIsHR = this.isHR();
      return;
    }

    this.jobService.getJobById(jobId).subscribe({
      next: (job) => {
        this.job = job;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = this.getErrorMessage(err);
        this.isLoading = false;
        console.error('Error loading job:', err);
      }
    });
  }

  private getErrorMessage(error: any): string {
    if (error.status === 404) {
      return 'Job not found';
    }
    return 'Failed to load job details. Please try again later.';
  }

  formatDate(date?: Date): string {
    return date ? new Date(date).toLocaleDateString() : 'Not specified';
  }

  getSkillsArray(): string[] {
    return this.job?.keySkills.split(',').map(skill => skill.trim()) || [];
  }

  // Safe accessor methods for template
  getWorkType(): string {
    return this.job ? this.workTypes[this.job.workType as WorkType] : '';
  }

  getExperience(): string {
    return this.job ? this.experienceLevels[this.job.experience as ExperienceLevel] : '';
  }

  getContractType(): string {
    return this.job ? this.contractTypes[this.job.contractType as ContractType] : '';
  }

  getDomain(): string {
    return this.job ? this.domains[this.job.domaine as Domain] : '';
  }
  isHR(): boolean {
      return this.userRole === 'HR';
    }
  getJobType(): string {
    return this.job ? this.jobTypes[this.job.type as JobType] : '';
  }
}
