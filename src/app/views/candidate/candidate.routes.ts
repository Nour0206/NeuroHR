import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { EducationComponent } from './education/education.component';
import { WorkHistoryComponent } from './work-history/work-history.component';
import { SkillsComponent } from './skills/skills.component';

export const CANDIDATE_ROUTES: Routes = [
  {
     path: '',
     component: ProfileComponent,
   },
   {
     path: 'skills',
     component: SkillsComponent,
   },
   {
     path: 'workhistory',
     component: WorkHistoryComponent,
   },
   {
     path: 'education',
     component: EducationComponent,
   }
];