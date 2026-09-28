export interface Project {
  id: string | number;
  name: string;
  title: string;
  description: string;
  language: string;
  html_url: string;
  homepage: string | null;
  technologies: string[];
  category: 'games' | 'apps' | 'ai' | 'all';
  featured?: boolean;
  stars?: number;
  forks?: number;
}

export interface SkillItem {
  name: string;
  category: 'frontend' | 'programming' | 'creative' | 'teaching';
  level: number; // 0 - 100
  iconName: string;
  experience: string;
  description: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  duration: string;
  type: string;
  description: string;
  highlights: string[];
  skillsTaught: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  status: string;
  field: string;
  description: string;
  modules: string[];
}
