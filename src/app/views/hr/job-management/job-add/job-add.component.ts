import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { JobService } from '../../../../services/job.service';
import { ToastrService } from 'ngx-toastr'; // ✅ Import toaster

@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class JobAddComponent {
  jobForm!: FormGroup;

  domains = [
    { value: 'Security', label: 'Security' },
    { value: 'Data', label: 'Data' },
    { value: 'Cloud', label: 'Cloud' },
    { value: 'Network', label: 'Network' },
    { value: 'AI', label: 'AI' },
    { value: 'Web', label: 'Web' },
    { value: 'Mobile', label: 'Mobile' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'Other', label: 'Other' }
  ];

  jobTypes = [
    { value: 'Onsite', label: 'Onsite' },
    { value: 'Remote', label: 'Remote' },
    { value: 'Hybrid', label: 'Hybrid' }
  ];

  workTypes = [
    { value: 'FullTime', label: 'Full Time' },
    { value: 'PartTime', label: 'Part Time' }
  ];

  experienceLevels = [
    { value: 'NoExperience', label: 'No Experience' },
    { value: '1 to 3 Years', label: '1 to 3 Years' },
    { value: '3 to 5 Years', label: '3 to 5 Years' }
  ];

  contractTypes = [
    { value: 'Permanent', label: 'Permanent' },
    { value: 'Temporary', label: 'Temporary' },
    { value: 'Internship', label: 'Internship' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private jobService: JobService,
    private toastr: ToastrService // ✅ Inject toaster
  ) {}

  ngOnInit(): void {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      postedDate: [null],
      experience: ['', Validators.required],
      contractType: ['', Validators.required],
      profile: ['', Validators.required],
      keySkills: ['', Validators.required],
      mission: ['', Validators.required],
      workingConditions: ['', Validators.required],
      domaine: ['', Validators.required],
      type: ['', Validators.required],
      workType: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      this.jobService.createJob(this.jobForm.value).subscribe({
        next: () => {
          this.toastr.success('Job created successfully!', 'Success ✅');
          this.router.navigate(['/job']);
        },
        error: (err) => {
          console.error('Error creating job:', err.error);
          this.toastr.error('Failed to create job. Please try again.', 'Error ❌');
        }
      });
    } else {
      this.toastr.warning('Please fill in all required fields.', 'Warning ⚠️');
    }
  }
}
