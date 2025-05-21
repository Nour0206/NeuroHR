import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { AuthGuard } from './views/pages/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,


    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes),
        canActivate: [AuthGuard]
      },
      {
        path: 'users',
        loadChildren: () => import('./views/users/user.routes').then((m) => m.userRoutes),
        canActivate: [AuthGuard]
      },
       {
        path: 'job',
        loadChildren: () => import('./views/hr/job-management/job-management.routes').then((m) => m.jobManagementRoutes),
        canActivate: [AuthGuard]
      },
      {
        path: 'candidate',
        loadChildren: () => import('./views/candidate/candidate.routes').then((m) => m.CANDIDATE_ROUTES),
        canActivate: [AuthGuard]
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/routes').then((m) => m.routes)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/routes').then((m) => m.routes)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/routes').then((m) => m.routes)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/routes').then((m) => m.routes)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/charts/routes').then((m) => m.routes)
      },
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
      },
      {
        path: 'chatbot',
        loadChildren: () => import('./views/chatbot/routes').then((m) => m.routes)
      },
      {
        path:'candidates',
        loadComponent: () => import('./views/hr/job-management/job-candidates/job-candidates.component').then((m) => m.JobCandidatesComponent)
      },
      {
    path: 'user-job-applications',
    loadComponent: () => import('../app/views/job-applications/user-job/user-job-applications.component').then(m => m.UserJobApplicationsComponent),
    data: {
      title: 'User Job Applications'
    }
  },
      
      {
        path: 'profile',
        loadComponent: () => import('./views/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [AuthGuard],
        data: { title: 'Profile' }
      },

    ]
  },
  {
    path: 'app',
    loadComponent: () => import('./views/job-applications/job-applications.component').then(m => m.ApplicationListComponent),
    data: {
      title: 'app'
    }
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  {
        path: 'onboarding',
        loadComponent: () => import('./views/profile-onboarding/profile-onboarding.component').then(m => m.ProfileOnboardingComponent)
      },
  {
        path: 'firstLogin',
        loadComponent: () => import('./views/pages/firstlogin/firstlogin.component').then(m => m.firstLoginComponent)
      },
  {
    path: 'user-job-applications',
    loadComponent: () => import('../app/views/job-applications/user-job/user-job-applications.component').then(m => m.UserJobApplicationsComponent),
    data: {
      title: 'User Job Applications'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];
