
export interface Job {
  role: string;
  company: string;
  date: string;
  location: string;
  description: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Project {
    name: string;
    tech: string[];
    description: string[];
    repoUrl: string;
    imageUrl: string;
}

export interface Education {
    degree: string;
    institution: string;
    date: string;
    score: string;
}

export interface Certification {
    name: string;
    date: string;
    link: string;
}

export interface ResumeData {
  name: string;
  contact: {
    email: string;
    phone: string;
  };
  experience: Job[];
  skills: SkillCategory[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  achievements: string[];
}

// FIX: Define and export the Message type for the chatbot feature.
export interface Message {
  sender: 'user' | 'ai';
  text: string;
}