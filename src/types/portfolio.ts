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
  category: 'programming' | 'ai_ml' | 'robotics' | 'embedded' | 'backend' | 'tools' | 'hardware' | 'web';
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
  githubUrl?: string;
  liveUrl?: string;
  architectureDetails?: string;
  engineeringLearnings?: string[];
  image: string;
  category: 'AI & Vision' | 'Academic Systems' | 'Embedded & IoT' | 'Python Apps' | 'AI & PINNs' | 'Full Stack & Security' | 'Robotics Simulation';
}

export interface ExperienceItem {
  id: string;
  period: string;
  title: string;
  roleType: 'Industrial Training' | 'Technical Project' | 'Independent Research' | 'Academic / Lab Work' | 'Hands-on Prototyping';
  focus: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface IndustrialTrainingItem {
  company: string;
  duration: string;
  role: string;
  focus: string;
  description: string;
  skillsAcquired: string[];
  certificatePath?: string;
}

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  location: string;
  score?: string;
  grade?: string;
  stream?: string;
  status: 'Ongoing (Completing 2026)' | 'Completed';
  highlights: string[];
}

export interface DownloadDocumentItem {
  id: string;
  title: string;
  category: 'Resume' | 'Industrial Training' | 'Contact Card' | 'Project Documentation';
  filename: string;
  path: string;
  fileSize: string;
  fileType: 'PDF' | 'VCF';
  description: string;
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
  alternateName: string;
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
  avatar: {
    original: string;
    thumbnail: string;
    background: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsappNumber: string;
    whatsappUrl: string;
    githubUsername: string;
    githubUrl: string;
    linkedinUrl: string;
    naukriUrl?: string;
    freelancerUrl?: string;
    locationCity: string;
    locationCountry: string;
  };
  resume: {
    originalFilename: string;
    originalPath: string;
    updatedFilename: string;
    updatedPath: string;
    lastUpdated: string;
  };
}
