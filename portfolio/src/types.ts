// Page types
export type PageType = 'home' | 'blog' | 'works' | 'contact';

// Blog post types
export interface BlogPost {
    id: string;
    title: string;
    date: string;
    tags: string[];
    excerpt: string;
    slug: string;
    content?: string;
}

// Work/Project types
export interface Work {
    id: string;
    title: string;
    year: number;
    category: string;
    description: string;
    image: string;
    slug: string;
    content?: string;
    images?: string[];
}

// Skill types
export interface Skill {
    id: string;
    name: string;
    level: number; // 0-100
    category: string;
}

// Social link types
export interface SocialLink {
    platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin';
    url: string;
}

// User profile type
export interface UserProfile {
    name: string;
    title: string;
    bio: string;
    profileImage: string;
    resumeLink: string;
}

// Contact form data type
export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

// Submit status type
export interface SubmitStatus {
    success?: boolean;
    message?: string;
}