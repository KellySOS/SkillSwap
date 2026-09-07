export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: SkillLevel;
  icon?: string;
  endorsements?: number;
}

export interface User {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  location: string;
  rating: number;
  reviewCount: number;
  swapsCompleted: number;
  skillsOffered: Skill[];
  skillsWanted: Skill[];
  availability: string[];
  responseTime: string;
  isOnline: boolean;
  featured?: boolean;
  languages: string[];
}

export interface SwapRequest {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerAvatar: string;
  offeredSkill: string;
  requestedSkill: string;
  date: string;
  time: string;
  duration: number; // minutes
  format: '1-on-1 Video' | 'Code & Screen Share' | 'Project Review' | 'Language Practice';
  note: string;
  status: 'pending' | 'accepted' | 'completed' | 'declined';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
  color: string;
}

export type ScreenType = 'home' | 'auth' | 'explore' | 'proposal' | 'confirmation' | 'dashboard' | 'live-room';

export type TransitionEffect = 'smart-animate' | 'dissolve' | 'slide-in' | 'push';
