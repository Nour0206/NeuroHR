import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'HelpBot',
    url: '/chatbot',
    iconComponent: { name: 'cil-speech' },
    badge: {
      color: 'info',
      text: 'ASK ME ANYTHING'
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
    name: 'Available Jobs',
    url: '/job',
    iconComponent: { name: 'cil-briefcase' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'My Applications',
    url: '/user-job-applications',
    iconComponent: { name: 'cil-list' }
  }
];
