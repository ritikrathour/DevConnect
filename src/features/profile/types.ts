// Profile Types

export type TabType = "overview" | "projects" | "activity" | "repositories";

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatar?: string;
  coverImage?: string;
  location?: string;
  website?: string;
  joinedDate: string;
  followers: number;
  following: number;
  isOnline: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  isPrivate: boolean;
  updatedAt: string;
  url?: string;
}

export interface Activity {
  id: string;
  type: "commit" | "pr" | "star" | "comment" | "merge" | "fork" | "issue";
  action: string;
  target: string;
  repository: string;
  timestamp: string;
  url?: string;
}

export interface Stat {
  icon: any; // LucideIcon type
  label: string;
  value: string;
  change: string;
  color: string;
  bgColor: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface SkillCategory {
  icon: any; // LucideIcon type
  title: string;
  color: string;
  bgColor: string;
  skills: Skill[];
}

export interface SocialLink {
  platform: "github" | "twitter" | "linkedin" | "email" | "website";
  url: string;
  icon: any; // LucideIcon type
}

export interface Achievement {
  id: string;
  emoji: string;
  name: string;
  description: string;
  color: string;
  earnedDate: string;
}
