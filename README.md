/* Card Styles */
.card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
}

.card-body {
  padding: 1.5rem;
}

/* Button Styles */
.btn {
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.5px;

  &:hover {
    transform: translateY(-2px);
  }
}

.btn-primary {
  background-color: #3f51b5;
  border-color: #3f51b5;
}

.btn-warning {
  background-color: #ff9800;
  border-color: #ff9800;
  color: white;
}

.btn-info {
  background-color: #00acc1;
  border-color: #00acc1;
  color: white;
}

.btn-danger {
  background-color: #f44336;
  border-color: #f44336;
  color: white;

  &:hover {
    background-color: #d32f2f;
    border-color: #d32f2f;
  }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .card {
    margin-bottom: 1.5rem;
  }
  
  .btn {
    padding: 0.5rem;
    font-size: 0.7rem;
  }
}


/* Modal Styles */
.modal {
  display: none;
  &.show {
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
  }
}

.modal-dialog {
  margin-top: 100px;
}

.modal-content {
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  border-bottom: 1px solid #eee;
  padding: 1rem 1.5rem;
}

.modal-footer {
  border-top: 1px solid #eee;
  padding: 1rem 1.5rem;
}

/* Form Styles */
.form-control {
  border-radius: 6px;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  
  &:focus {
    border-color: #3f51b5;
    box-shadow: 0 0 0 0.2rem rgba(63, 81, 181, 0.25);
  }
}

textarea.form-control {
  min-height: 100px;
}

/* Button adjustments */
.btn[disabled] {
  opacity: 0.65;
  cursor: not-allowed;
}
_____________________________________________________________________________________________________
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    ReactiveFormsModule
  ]
})
export class JobListComponent {
 /*  jobs: Job[] = [];
  showModal = false;

  
  
  // Initialize the form group with default values and validators
  jobForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    location: ['', Validators.required]
  });

  constructor(
    private jobService: JobService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobService.getJobs().subscribe({
      next: (data: Job[]) => this.jobs = data,
      error: (err) => console.error('Error loading jobs:', err)
    });
  }

  openAddJobModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.jobForm.reset();
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      this.jobService.createJob(this.jobForm.value).subscribe({
        next: () => {
          this.loadJobs();
          this.closeModal();
          // You could add a success toast/notification here
        },
        error: (err) => {
          console.error('Error creating job:', err);
          // You could show an error message to the user here
        }
      });
    }
  }

  deleteJob(id: number): void {
    if (confirm('Are you sure you want to delete this job?')) {
      this.jobService.deleteJob(id).subscribe({
        next: () => this.loadJobs(),
        error: (err) => console.error('Error deleting job:', err)
      });
    }
  } */
}
_____________________________________________________________________________________________________
<!--  <div class="container my-5">
    <div class="d-flex justify-content-between mb-4">
      <h2>Job Listings</h2>
      <button class="btn btn-primary" (click)="openAddJobModal()">Add New Job</button>
    </div>
  
   
    <div class="row">
      <div *ngFor="let job of jobs" class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ job.title }}</h5>
            <p class="card-text">{{ job.description }}</p>
            <p class="mt-auto"><strong>Location:</strong> {{ job.location }}</p>
            
            <div class="d-flex justify-content-between gap-2 mt-3">
              <button class="btn btn-warning flex-grow-1">Update</button>
              <button class="btn btn-info flex-grow-1">Details</button>
              <button class="btn btn-danger flex-grow-1" (click)="deleteJob(job.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
 
<div class="modal fade" [class.show]="showModal" [style.display]="showModal ? 'block' : 'none'">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Add New Job</h5>
        <button type="button" class="btn-close" (click)="closeModal()"></button>
      </div>
      <div class="modal-body">
        <form [formGroup]="jobForm" (ngSubmit)="onSubmit()">
          <div class="row">
          
            <div class="col-md-6">
            
              <div class="mb-3">
                <label for="title" class="form-label">Job Title</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="title" 
                  formControlName="title"
                  [class.is-invalid]="jobForm.get('title')?.invalid && jobForm.get('title')?.touched">
                
                <div *ngIf="jobForm.get('title')?.errors?.['required'] && jobForm.get('title')?.touched" 
                     class="invalid-feedback">
                  Title is required
                </div>
              </div>
              
             
              <div class="mb-3">
                <label for="location" class="form-label">Location</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="location" 
                  formControlName="location"
                  [class.is-invalid]="jobForm.get('location')?.invalid && jobForm.get('location')?.touched">
                
                <div *ngIf="jobForm.get('location')?.errors?.['required'] && jobForm.get('location')?.touched" 
                     class="invalid-feedback">
                  Location is required
                </div>
              </div>
              
            
              <div class="mb-3">
                <label for="postedDate" class="form-label">Posted Date</label>
                <input 
                  type="date" 
                  class="form-control" 
                  id="postedDate" 
                  formControlName="postedDate"
                  [class.is-invalid]="jobForm.get('postedDate')?.invalid && jobForm.get('postedDate')?.touched">
              </div>
              
            
              <div class="mb-3">
                <label for="experience" class="form-label">Experience Required</label>
                <select 
                  class="form-select" 
                  id="experience" 
                  formControlName="experience"
                  [class.is-invalid]="jobForm.get('experience')?.invalid && jobForm.get('experience')?.touched">
                  <option value="">Select experience level</option>
                  <option value="Sans experinece">No experience</option>
                  <option value="1 a 3 ans">1 to 3 years</option>
                  <option value="3 a 5 ans">3 to 5 years</option>
                </select>
              </div>
              
             
              <div class="mb-3">
                <label for="typeDeContrat" class="form-label">Contract Type</label>
                <select 
                  class="form-select" 
                  id="typeDeContrat" 
                  formControlName="typeDeContrat"
                  [class.is-invalid]="jobForm.get('typeDeContrat')?.invalid && jobForm.get('typeDeContrat')?.touched">
                  <option value="">Select contract type</option>
                  <option value="CDI">Permanent (CDI)</option>
                  <option value="CDD">Fixed-term (CDD)</option>
                  <option value="SIVP">Internship (SIVP)</option>
                </select>
              </div>
            </div>
            
          
            <div class="col-md-6">
            
              <div class="mb-3">
                <label for="typeDeTravail" class="form-label">Work Type</label>
                <select 
                  class="form-select" 
                  id="typeDeTravail" 
                  formControlName="typeDeTravail"
                  [class.is-invalid]="jobForm.get('typeDeTravail')?.invalid && jobForm.get('typeDeTravail')?.touched">
                  <option value="">Select work type</option>
                  <option value="Plein Temps Présentiel">Full-time On-site</option>
                  <option value="Mis Temps Présentiel">Part-time On-site</option>
                  <option value="Plein Temps Présentiel">Full-time Remote</option>
                </select>
              </div>
              
             
              <div class="mb-3">
                <label for="diplome" class="form-label">Required Diploma</label>
                <select 
                  class="form-select" 
                  id="diplome" 
                  formControlName="diplome"
                  [class.is-invalid]="jobForm.get('diplome')?.invalid && jobForm.get('diplome')?.touched">
                  <option value="">Select diploma level</option>
                  <option value="Baccalauréat">High School Diploma</option>
                  <option value="licence">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="Ingenieur">Engineering Degree</option>
                  <option value="autre">Other</option>
                </select>
              </div>
              
             
              <div class="mb-3">
                <label for="profil" class="form-label">Profile</label>
                <textarea 
                  class="form-control" 
                  id="profil" 
                  rows="2" 
                  formControlName="profil"
                  [class.is-invalid]="jobForm.get('profil')?.invalid && jobForm.get('profil')?.touched"></textarea>
              </div>
              
              
              <div class="mb-3">
                <label for="mission" class="form-label">Missions</label>
                <textarea 
                  class="form-control" 
                  id="mission" 
                  rows="2" 
                  formControlName="mission"
                  [class.is-invalid]="jobForm.get('mission')?.invalid && jobForm.get('mission')?.touched"></textarea>
              </div>
            </div>
          </div>
          
          
          <div class="mb-3">
            <label for="description" class="form-label">Job Description</label>
            <textarea 
              class="form-control" 
              id="description" 
              rows="4" 
              formControlName="description"
              [class.is-invalid]="jobForm.get('description')?.invalid && jobForm.get('description')?.touched"></textarea>
            
            <div *ngIf="jobForm.get('description')?.errors?.['required'] && jobForm.get('description')?.touched" 
                 class="invalid-feedback">
              Description is required
            </div>
          </div>
          
         
          <div class="mb-3">
            <label for="canditionsDetavail" class="form-label">Work Conditions</label>
            <textarea 
              class="form-control" 
              id="canditionsDetavail" 
              rows="2" 
              formControlName="canditionsDetavail"
              [class.is-invalid]="jobForm.get('canditionsDetavail')?.invalid && jobForm.get('canditionsDetavail')?.touched"></textarea>
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="closeModal()">Close</button>
            <button type="submit" class="btn btn-primary" [disabled]="jobForm.invalid">Save Job</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>


<div class="modal-backdrop fade" [class.show]="showModal" [style.display]="showModal ? 'block' : 'none'"></div>
   


   Add Job Modal 
    <div class="modal fade" [class.show]="showModal" [style.display]="showModal ? 'block' : 'none'">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Job</h5>
            <button type="button" class="btn-close" (click)="closeModal()"></button>
          </div>
          <div class="modal-body">
            <form [formGroup]="jobForm" (ngSubmit)="onSubmit()">
              <div class="mb-3">
                <label for="title" class="form-label">Job Title</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="title" 
                  formControlName="title"
                  [class.is-invalid]="jobForm.get('title')?.invalid && jobForm.get('title')?.touched">
                
                <div *ngIf="jobForm.get('title')?.errors?.['required'] && jobForm.get('title')?.touched" 
                     class="invalid-feedback">
                  Title is required
                </div>
                <div *ngIf="jobForm.get('title')?.errors?.['minlength']" 
                     class="invalid-feedback">
                  Minimum 3 characters required
                </div>
              </div>
              
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea 
                  class="form-control" 
                  id="description" 
                  rows="3" 
                  formControlName="description"
                  [class.is-invalid]="jobForm.get('description')?.invalid && jobForm.get('description')?.touched"></textarea>
                
                <div *ngIf="jobForm.get('description')?.errors?.['required'] && jobForm.get('description')?.touched" 
                     class="invalid-feedback">
                  Description is required
                </div>
                <div *ngIf="jobForm.get('description')?.errors?.['minlength']" 
                     class="invalid-feedback">
                  Minimum 10 characters required
                </div>
              </div>
              
              <div class="mb-3">
                <label for="location" class="form-label">Location</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="location" 
                  formControlName="location"
                  [class.is-invalid]="jobForm.get('location')?.invalid && jobForm.get('location')?.touched">
                
                <div *ngIf="jobForm.get('location')?.errors?.['required'] && jobForm.get('location')?.touched" 
                     class="invalid-feedback">
                  Location is required
                </div>
              </div>
              
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" (click)="closeModal()">Close</button>
                <button type="submit" class="btn btn-primary" [disabled]="jobForm.invalid">Save Job</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    
    <div class="modal-backdrop fade" [class.show]="showModal" [style.display]="showModal ? 'block' : 'none'"></div>
   -->
