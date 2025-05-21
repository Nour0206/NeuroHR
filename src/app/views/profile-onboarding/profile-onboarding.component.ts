import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-onboarding',
  templateUrl: './profile-onboarding.component.html',
  styleUrls: ['./profile-onboarding.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ProfileOnboardingComponent {
  step: 'choice' | 'upload' | 'manual' = 'choice';
  resumeFile: File | null = null;
  userProfile: Partial<User> = {
    professionalExperiences: [],
    education: [],
    projects: [],
    languages: [],
    certifications: [],
    profileSummary: ''
  };
  uploading = false;
  errorMsg = '';

  // New entry templates with all year fields as strings
  newProfessionalExperience = {
    jobTitle: '',
    company: '',
    startDate: '',
    endDate: '',
    description: ''
  };

  newEducation = {
    degree: '',
    institution: '',
    year: ''
  };

  newProject = {
    title: '',
    description: '',
    technologies: ''
  };

  newCertification = {
    name: '',
    institution: '',
    year: ''
  };

  newLanguage = '';

  private flaskUrl = 'http://localhost:5000/extract_profile';

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.resumeFile = file;
    }
  }

  startUpload() {
    this.step = 'upload';
  }

  startManualEntry() {
    this.step = 'manual';
    this.userProfile = {
      professionalExperiences: [],
      education: [],
      projects: [],
      languages: [],
      certifications: [],
      profileSummary: ''
    };
    this.resetFormFields();
  }

  resetFormFields() {
    this.newProfessionalExperience = {
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    this.newEducation = {
      degree: '',
      institution: '',
      year: ''
    };
    this.newProject = {
      title: '',
      description: '',
      technologies: ''
    };
    this.newCertification = {
      name: '',
      institution: '',
      year: ''
    };
    this.newLanguage = '';
  }

  uploadResume() {
    if (!this.resumeFile) {
      this.errorMsg = 'Please select a resume file first.';
      return;
    }
    this.uploading = true;
    this.errorMsg = '';

    const formData = new FormData();
    formData.append('resume', this.resumeFile);

    this.http.post<Partial<User>>(this.flaskUrl, formData).subscribe({
      next: (profile) => {
        this.userProfile = this.formatIncomingProfile(profile);
        this.uploading = false;
        this.saveProfile();
      },
      error: (err) => {
        console.error('Error uploading resume:', err);
        this.errorMsg = 'Failed to extract profile. Please try again.';
        this.uploading = false;
      }
    });
  }

  addProfessionalExperience() {
    if (!this.userProfile.professionalExperiences) {
      this.userProfile.professionalExperiences = [];
    }
    this.userProfile.professionalExperiences.push({...this.newProfessionalExperience});
    this.newProfessionalExperience = {
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    };
  }

  removeProfessionalExperience(index: number) {
    this.userProfile.professionalExperiences?.splice(index, 1);
  }

  addEducation() {
    if (!this.userProfile.education) {
      this.userProfile.education = [];
    }
    this.userProfile.education.push({...this.newEducation});
    this.newEducation = {
      degree: '',
      institution: '',
      year: ''
    };
  }

  removeEducation(index: number) {
    this.userProfile.education?.splice(index, 1);
  }

  addProject() {
    if (!this.userProfile.projects) {
      this.userProfile.projects = [];
    }
    this.userProfile.projects.push({
      title: this.newProject.title,
      description: this.newProject.description,
      technologies: this.newProject.technologies.split(',').map(t => t.trim())
    });
    this.newProject = {
      title: '',
      description: '',
      technologies: ''
    };
  }

  removeProject(index: number) {
    this.userProfile.projects?.splice(index, 1);
  }

  addCertification() {
    if (!this.userProfile.certifications) {
      this.userProfile.certifications = [];
    }
    this.userProfile.certifications.push({...this.newCertification});
    this.newCertification = {
      name: '',
      institution: '',
      year: ''
    };
  }

  removeCertification(index: number) {
    this.userProfile.certifications?.splice(index, 1);
  }

  addLanguage() {
    if (!this.userProfile.languages) {
      this.userProfile.languages = [];
    }
    this.userProfile.languages.push(this.newLanguage);
    this.newLanguage = '';
  }

  removeLanguage(index: number) {
    this.userProfile.languages?.splice(index, 1);
  }

  saveProfile() {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.errorMsg = 'User not authenticated.';
      return;
    }

    const formattedProfile = this.ensureAllYearsAsStrings(this.formatOutgoingProfile(this.userProfile));
    console.log('Final profile data with string years:', formattedProfile);

    this.userService.updateUser(userId, formattedProfile as User).subscribe({
      next: () => {
        this.router.navigate(['/job']);
      },
      error: (err) => {
        console.error('Error saving profile:', err);
        this.errorMsg = 'Failed to save profile to server.';
      }
    });
  }

  private ensureAllYearsAsStrings(profile: any): any {
    // Deep clone the profile to avoid modifying the original
    const result = JSON.parse(JSON.stringify(profile));

    // Convert education years
    if (result.Education) {
      result.Education = result.Education.map((edu: any) => ({
        ...edu,
        Year: edu.Year ? edu.Year.toString() : ''
      }));
    }

    // Convert certification years
    if (result.Certifications) {
      result.Certifications = result.Certifications.map((cert: any) => ({
        ...cert,
        Year: cert.Year ? cert.Year.toString() : ''
      }));
    }

    return result;
  }

  private formatIncomingProfile(profile: any): Partial<User> {
    return {
      professionalExperiences: profile.ProfessionalExperiences?.map((exp: any) => ({
        jobTitle: exp.JobTitle,
        company: exp.Company,
        startDate: exp.StartDate,
        endDate: exp.EndDate || '',
        description: exp.Description
      })) || [],
      education: profile.Education?.map((edu: any) => ({
        degree: edu.Degree,
        institution: edu.Institution,
        year: edu.Year ? edu.Year.toString() : ''
      })) || [],
      projects: profile.Projects?.map((proj: any) => ({
        title: proj.Title,
        description: proj.Description,
        technologies: proj.Technologies || []
      })) || [],
      languages: profile.Languages || [],
      certifications: profile.Certifications?.map((cert: any) => ({
        name: cert.Name,
        institution: cert.Institution,
        year: cert.Year ? cert.Year.toString() : ''
      })) || [],
      profileSummary: profile.ProfileSummary || ''
    };
  }

  private formatOutgoingProfile(profile: Partial<User>): any {
    return {
      Certifications: (profile.certifications || []).map(cert => ({
        Name: cert.name,
        Institution: cert.institution,
        Year: cert.year || ''
      })),
      Education: (profile.education || []).map(edu => ({
        Degree: edu.degree,
        Institution: edu.institution,
        Year: edu.year || ''
      })),
      Languages: profile.languages || [],
      ProfessionalExperiences: (profile.professionalExperiences || []).map(exp => ({
        Company: exp.company,
        Description: exp.description,
        EndDate: exp.endDate || '',
        JobTitle: exp.jobTitle,
        StartDate: exp.startDate || ''
      })),
      ProfileSummary: profile.profileSummary || '',
      Projects: (profile.projects || []).map(proj => ({
        Title: proj.title,
        Description: proj.description,
        Technologies: proj.technologies || []
      }))
    };
  }
}
