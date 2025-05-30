export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: 'admin' | 'hr' | 'candidate';
    username: string
  }