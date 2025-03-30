import { ReactNode } from 'react';

// Common prop types
export interface AnimatedIconProps {
  children: ReactNode;
  delay?: string;
  className?: string;
}

export interface AnimatedButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  primary?: boolean;
}

export interface SectionTitleProps {
  children: ReactNode;
}

export interface RevealSectionProps {
  children: ReactNode;
  id: string;
  className?: string;
  darker?: boolean;
}

export interface DarkModeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export interface AnimatedNavProps {
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  isScrolling: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scrollToSection: (sectionId: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export interface CustomHeroProps {
  scrollToSection: (sectionId: string) => void;
}

export interface Skill {
  name: string;
  icon: ReactNode;
  category: string;
  color: string;
}

export interface SkillCardProps {
  skill: Skill;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  skills: string[];
  skillColors: string[];
}

export interface ContactMethodProps {
  icon: ReactNode;
  title: string;
  value: string;
  link?: string;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}