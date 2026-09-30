export type FAQCategory = 
  | 'getting-started' 
  | 'care-team' 
  | 'pricing-booking' 
  | 'privacy-safety' 
  | 'general';

export interface FAQItem {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
  readTime?: string;
  tags?: string[];
}

export type YogaDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type YogaGoal = 'Stress Relief' | 'Sleep' | 'Focus' | 'Energy';

export interface YogaPose {
  id: string;
  name: string;
  sanskritName: string;
  difficulty: YogaDifficulty;
  category: YogaGoal;
  durationSeconds: number;
  benefits: string[];
  steps: string[];
  breathingCues: string[];
  contraindications: string[];
  iconType: 'lotus' | 'sun' | 'warrior' | 'child' | 'cobra' | 'tree' | 'bridge' | 'meditation';
  isCompleted?: boolean;
}

export type MessageSender = 'user' | 'bot' | 'system';

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: string;
  quickReplies?: string[];
  moodCategory?: 'sad' | 'neutral' | 'calm' | 'happy';
  isScreeningQuestion?: boolean;
}

export interface MoodEntry {
  id: string;
  date: string; // YYYY-MM-DD
  score: number; // 1 to 5
  emoji: string;
  label: string;
  emotionTags: string[];
  note?: string;
}

export interface Consultation {
  id: string;
  doctorName: string;
  doctorRole: string;
  doctorAvatar: string;
  specialty: string;
  dateTime: string;
  durationMinutes: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  meetingLink?: string;
  notes?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  streakDays: number;
  totalPosesCompleted: number;
  totalMinutesYoga: number;
  wellnessScore: number;
}
