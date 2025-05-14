import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Candidature '
  },
  {
    name: 'Users',
    url: '/users',
    iconComponent: { name: 'cil-user' },
    attributes: {}
  },
  {
    name: 'Offres De Travail',
    url: '/job',
    iconComponent: { name: 'cil-briefcase' }
  },
  {
    name: 'ChatBot',
    url: '/chatbot',
    iconComponent: { name: 'cil-speech' }
  },
  {
    name: 'Candidate Management',
    url: '/candidate',
    iconComponent: { name: 'cil-people' }
  },
  {
    name: 'My Applications',
    url: '/user-job-applications',
    iconComponent: { name: 'cil-list' }
  }
];
