export interface Project {
    name: string;
    url: string;
    description?: string;
}

export interface Skill {
    name: string;
    fullName: string;
    icon: string;
    proficiency: 1 | 2 | 3; // 1 = Beginner, 2 = Intermediate, 3 = Advanced
    features: string[];
    projects: Project[];
}

export interface SkillCategory {
    name: string;
    description?: string;
    skills: Skill[];
}

export interface TechStackData {
    categories: SkillCategory[];
}