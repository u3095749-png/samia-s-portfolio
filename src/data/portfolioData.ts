import { Project, SkillItem, ExperienceItem, EducationItem } from '../types/portfolio';

export const personalInfo = {
  name: "Samia Siddiqui",
  title: "Educator & Web Developer",
  age: 18,
  qualification: "Intermediate (Inter)",
  experience: "1 Year of Teaching",
  phone: "03112537554",
  email: "u3095749@gmail.com",
  github: "https://github.com/u3095749-png",
  githubUsername: "u3095749-png",
  location: "Pakistan",
  taglines: [
    "Teacher",
    "Creative Designer",
    "Web Developer",
    "Programmer"
  ],
  bio: "I am an 18-year-old passionate educator and web developer with 1 year of dedicated teaching experience. Combining technical craft in modern web development and TypeScript with a love for mentoring young minds, I build engaging digital applications and interactive browser games while empowering students with practical computer programming skills."
};

export const verifiedGitHubProjects: Project[] = [
  {
    id: "car-racing",
    name: "car-racing",
    title: "Car Racing Challenge",
    description: "High-octane 2D arcade car racing game built with TypeScript, featuring obstacle dodging, score tracking, responsive controls, and smooth game loops.",
    language: "TypeScript",
    html_url: "https://github.com/u3095749-png/car-racing",
    homepage: "https://car-racing-rose.vercel.app",
    technologies: ["TypeScript", "HTML5 Canvas", "Tailwind CSS", "Vercel"],
    category: "games",
    featured: true
  },
  {
    id: "AI",
    name: "AI",
    title: "AI Interactive Assistant",
    description: "Smart conversational AI web interface integrating intelligent query responses, real-time message streams, and clean modern card design.",
    language: "TypeScript",
    html_url: "https://github.com/u3095749-png/AI",
    homepage: "https://ai-one-chi-71.vercel.app",
    technologies: ["TypeScript", "AI Integration", "React", "Vercel"],
    category: "ai",
    featured: true
  },
  {
    id: "Burger",
    name: "Burger",
    title: "Samia's Burger Express",
    description: "Interactive food ordering and culinary showcase web application featuring responsive meal catalogs, interactive selection, and smooth styling.",
    language: "TypeScript",
    html_url: "https://github.com/u3095749-png/Burger",
    homepage: "https://burgersamia.vercel.app",
    technologies: ["TypeScript", "React", "Tailwind CSS", "Vercel"],
    category: "apps",
    featured: true
  }
];

export const skillsData: SkillItem[] = [
  {
    name: "TypeScript & JavaScript",
    category: "programming",
    level: 92,
    iconName: "Code2",
    experience: "Core Focus",
    description: "Strong typing, async patterns, DOM manipulation, and modular architecture used across 17+ projects."
  },
  {
    name: "React & Modern Web",
    category: "frontend",
    level: 88,
    iconName: "Layers",
    experience: "Active Daily",
    description: "Component hierarchy, hooks, state management, and modern client-side application design."
  },
  {
    name: "Interactive Game Logic",
    category: "programming",
    level: 90,
    iconName: "Gamepad2",
    experience: "Specialized",
    description: "Game loops, collision detection, Canvas rendering, state tracking, and keyboard/touch input handling."
  },
  {
    name: "Tailwind CSS & Styling",
    category: "frontend",
    level: 94,
    iconName: "Palette",
    experience: "Expertise",
    description: "Fluid responsive layouts, modern glassmorphism, micro-interactions, and mobile-first design systems."
  },
  {
    name: "Teaching & Pedagogy",
    category: "teaching",
    level: 95,
    iconName: "GraduationCap",
    experience: "1 Year Active",
    description: "Delivering clear, structured lessons in computer programming, problem solving, and computational thinking."
  },
  {
    name: "Curriculum Development",
    category: "teaching",
    level: 86,
    iconName: "BookOpen",
    experience: "1 Year Active",
    description: "Structuring practical hands-on coding exercises, assignments, and guided coding mini-projects for learners."
  },
  {
    name: "Creative UI/UX Design",
    category: "creative",
    level: 88,
    iconName: "Sparkles",
    experience: "Core Passion",
    description: "Visual balance, typographic hierarchy, clean color theory, accessible contrast, and smooth transitions."
  },
  {
    name: "Git & GitHub Workflow",
    category: "programming",
    level: 89,
    iconName: "GitBranch",
    experience: "17+ Repos",
    description: "Version control, branching, repository management, and continuous deployment via Vercel."
  }
];

export const teachingExperience: ExperienceItem[] = [
  {
    role: "Computer Science & Programming Educator",
    organization: "Private Academy & Mentorship",
    period: "2025 – Present",
    duration: "1 Year Active",
    type: "Teaching & Instruction",
    description: "Instructed beginner and intermediate students in computer science foundations, basic programming constructs, web development basics, and logical problem solving. Designed practical learning milestones that made coding intuitive and fun.",
    highlights: [
      "Mentored students from ground zero to creating their first functional web pages and interactive games",
      "Developed structured lesson plans breaking down complex algorithms into simple step-by-step visuals",
      "Fostered high classroom engagement through interactive coding challenges and friendly hackathon days",
      "Provided personalized one-on-one debugging support and code reviews for young learners"
    ],
    skillsTaught: ["Programming Fundamentals", "Logic & Loops", "Web Basics", "Problem Solving", "Student Mentorship"]
  }
];

export const educationData: EducationItem[] = [
  {
    degree: "Intermediate (Inter) — Higher Secondary",
    institution: "Board of Intermediate Education",
    year: "Completed",
    status: "Graduated",
    field: "Pre-Engineering / Computer Science Stream",
    description: "Rigorous academic training in core mathematical disciplines, analytical reasoning, physics, and computer fundamentals, providing a solid theoretical foundation for software engineering and education.",
    modules: [
      "Computer Science & Programming Logic",
      "Advanced Mathematics & Calculus",
      "Physics & Mechanics",
      "Analytical & Algorithmic Problem Solving"
    ]
  }
];
