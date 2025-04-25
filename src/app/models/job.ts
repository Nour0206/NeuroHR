export interface Job {
    id: number;
    title: string;
    description: string;
    location: string;
    postedDate: Date;
    Experience:'Sans experinece' | '3 a 5 ans ' | '1 a 3 ans ';
    typeDeContrat:'CDI' | 'CDD' | 'SIVP';
    profil:string
    mission:string 
    canditionsDetavail:string
    Diplome:'Baccalauréat'|'licence'|'master'|'Ingenieur'|'autre';
    TypeDeTravail:' Plein Temps Présentiel'|'Mis Temps Présentiel'|' Plein Temps Présentiel';
  }