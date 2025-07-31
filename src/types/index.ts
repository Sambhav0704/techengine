export interface Student {
  id: string;
  rank?: number;
  name: string;
  email: string;
  domain: string;
  score?: number;
  assessmentScore?: number;
  status?: 'Available' | 'Interviewed' | 'Hired' | 'In Process';
  experience: string;
  locationPreference?: string;
  education: string;
  skills: string[];
  availability: string;
  resumeLink?: string;
  githubLink?: string;
  portfolioLink?: string;
  phone?: string;
  location: string;
  projects?: Project[];
  assessments?: Assessment[];
  badges?: string[];
  assessmentType?: string;
  shortlisted?: boolean;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Assessment {
  type: string;
  score: number;
  maxScore: number;
  date: string;
  feedback?: string;
}

export interface Filters {
  domain: string;
  experience: string;
  location: string;
  assessmentType: string;
  education: string;
  skills: string[];
  availability: string;
}

export interface EmailData {
  recipients: string[];
  subject: string;
  body: string;
}