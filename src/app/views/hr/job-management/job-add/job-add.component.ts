/**import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { JobService } from  '../../../../services/job.service';

@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class JobAddComponent {
  jobForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private jobService: JobService) {
    this.jobForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      location: ['', Validators.required],
      postedDate: ['', Validators.required],
      experience: ['', Validators.required],
      contractType: ['', Validators.required],
      domaine: ['', Validators.required],
      type: ['', Validators.required],
      workType: ['', Validators.required],
      profile: ['', Validators.required],
      keySkills: ['', Validators.required],
      mission: ['', Validators.required],
      workingConditions: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.jobForm.valid) {
      console.log('Form Values:', this.jobForm.value); // Log form values
      this.jobService.createJob(this.jobForm.value).subscribe({
        next: () => {
          alert('Job created successfully!');
          this.router.navigate(['/job']); // Navigate back to the job list
        },
        error: (err) => {
          console.error('Error creating job:', err.error);
          alert('Failed to create job. Please try again.');
        }
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }


}*/
