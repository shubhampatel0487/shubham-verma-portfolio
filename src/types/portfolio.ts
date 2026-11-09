export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  label: string;
  isAvailable: boolean;
}

export interface SkillItem {
  name: string;
  level: string; // e.g. "Practical Knowledge", "Intermediate", "Familiar", "Academic / Lab"
  category: 'programming' | 'ai_ml' | 'robotics' | 'embedded' | 'backend' | 'tools';
  description?: string;
  tags?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  overview: string;
  problemStatement: string;
  technologies: string[];
  keyFeatures: string[];
  status: 'In Progress' | 'Experimental' | 'Completed' | 'Research Prototype';
  statusBadgeColor?: 'amber' | 'blue' | 'purple' | 'emerald';
  githubUrl?: string; // If undefined or placeholder, show clean modal indicator
  liveUrl?: string;
  architectureDetails?: string;
  engineeringLearnings?: string[];
  image: string;
  category: 'AI & PINNs' | 'Full Stack & Security' | 'Web Systems' | 'Embedded & IoT' | 'Robotics Simulation';
}

export interface ExperienceItem {
  id: string;
  period: string;
  title: string;
  roleType: 'Technical Project' | 'Independent Research' | 'Academic / Lab Work' | 'Hands-on Prototyping';
  focus: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  location: string;
  score?: string;
  stream?: string;
  status: 'Ongoing (Completing 2026)' | 'Completed';
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  status: 'In Progress' | 'Completed' | 'Planned';
}

export interface PersonalProfile {
  name: string;
  primaryTitle: string;
  secondaryTitle: string;
  location: string;
  heroTagline: string;
  alternativeTagline: string;
  bioIntroduction: string;
  fullBio: {
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
  mission: string;
  vision: string;
  engineeringPhilosophy: string[];
  contact: {
    email: string;
    githubUsername: string;
    githubUrl: string;
    linkedinUrl: string;
    locationCity: string;
    locationCountry: string;
  };
  resume: {
    filename: string;
    path: string;
    lastUpdated: string;
  };
}
