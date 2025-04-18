import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { EducationComponent } from './education/education.component';
import { WorkHistoryComponent } from './work-history/work-history.component';
import { SkillsComponent } from './skills/skills.component';

export const CANDIDATE_ROUTES: Routes = [
  {
    path: '', // Base path for all candidate routes
    component: ProfileComponent, // Main container component
    children: [
      { 
        path: 'education', 
        component: EducationComponent,
        title: 'Candidate Education' // Optional title for the route
      },
      { 
        path: 'work-history', 
        component: WorkHistoryComponent,
        title: 'Work History'
      },
      { 
        path: 'skills', 
        component: SkillsComponent,
        title: 'Candidate Skills'
      },
      { 
        path: '', 
        redirectTo: 'education', // Default child route
        pathMatch: 'full'
      }
    ]
  }
];