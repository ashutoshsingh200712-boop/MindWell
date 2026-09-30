import { Consultation, MoodEntry, UserProfile } from '../types';

export const CURRENT_USER: UserProfile = {
  name: 'Elena Rostova',
  email: 'elena.rostova@example.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  streakDays: 12,
  totalPosesCompleted: 28,
  totalMinutesYoga: 340,
  wellnessScore: 84,
};

export const MOCK_MOOD_HISTORY: MoodEntry[] = [
  { id: 'm-1', date: '2026-09-21', score: 3, emoji: '😐', label: 'Balanced', emotionTags: ['Tired', 'Routine'], note: 'Busy workday, took an evening walk.' },
  { id: 'm-2', date: '2026-09-22', score: 2, emoji: '😔', label: 'Overwhelmed', emotionTags: ['Anxious', 'Deadline'], note: 'High stress before project launch.' },
  { id: 'm-3', date: '2026-09-23', score: 3, emoji: '😐', label: 'Grounding', emotionTags: ['Reflective', 'Calmer'], note: 'Practiced Child’s Pose before bed.' },
  { id: 'm-4', date: '2026-09-24', score: 4, emoji: '🙂', label: 'Relieved', emotionTags: ['Productive', 'Relieved'], note: 'Presentation went really well.' },
  { id: 'm-5', date: '2026-09-25', score: 4, emoji: '🙂', label: 'Peaceful', emotionTags: ['Grateful', 'Rested'], note: 'Good 8 hours of sleep.' },
  { id: 'm-6', date: '2026-09-26', score: 5, emoji: '😊', label: 'Energized', emotionTags: ['Optimistic', 'Focused'], note: 'Completed 20 min Morning Flow.' },
  { id: 'm-7', date: '2026-09-27', score: 4, emoji: '🙂', label: 'Content', emotionTags: ['Calm', 'Mindful'], note: 'Feeling grounded and ready for the week.' },
];

export const MOCK_MOOD_CHART_30_DAYS = [
  { date: 'Sep 01', score: 3.2, sleep: 6.5, anxiety: 4.1 },
  { date: 'Sep 04', score: 2.8, sleep: 5.8, anxiety: 4.5 },
  { date: 'Sep 07', score: 3.5, sleep: 7.0, anxiety: 3.2 },
  { date: 'Sep 10', score: 3.1, sleep: 6.2, anxiety: 3.8 },
  { date: 'Sep 13', score: 4.0, sleep: 7.5, anxiety: 2.5 },
  { date: 'Sep 16', score: 3.8, sleep: 7.2, anxiety: 2.9 },
  { date: 'Sep 19', score: 2.9, sleep: 5.5, anxiety: 4.2 },
  { date: 'Sep 22', score: 3.4, sleep: 6.8, anxiety: 3.1 },
  { date: 'Sep 25', score: 4.5, sleep: 8.0, anxiety: 1.8 },
  { date: 'Sep 27', score: 4.2, sleep: 7.8, anxiety: 2.0 },
];

export const MOCK_YOGA_WEEKLY_DATA = [
  { day: 'Mon', minutes: 25, poses: 4 },
  { day: 'Tue', minutes: 15, poses: 2 },
  { day: 'Wed', minutes: 30, poses: 5 },
  { day: 'Thu', minutes: 20, poses: 3 },
  { day: 'Fri', minutes: 35, poses: 6 },
  { day: 'Sat', minutes: 45, poses: 7 },
  { day: 'Sun', minutes: 30, poses: 5 },
];

export const MOCK_CONSULTATIONS: Consultation[] = [
  {
    id: 'c-1',
    doctorName: 'Dr. Sarah Jenkins, MD',
    doctorRole: 'Board-Certified Adult Psychiatrist',
    doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=250&q=80',
    specialty: 'Neurobiology, Stress & Pharmacotherapy',
    dateTime: 'Tomorrow at 4:30 PM (EST)',
    durationMinutes: 45,
    status: 'upcoming',
    meetingLink: 'https://mindwell.care/telehealth/session/live-room-781',
    notes: 'Follow-up on sleep restoration strategy and anxiety symptom reduction.'
  },
  {
    id: 'c-2',
    doctorName: 'Dr. Marcus Vance, PhD',
    doctorRole: 'Senior Clinical Psychologist & Somatic Therapist',
    doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=250&q=80',
    specialty: 'Cognitive Behavioral Therapy (CBT) & Somatic Experiencing',
    dateTime: 'Sep 18, 2026 • 2:00 PM',
    durationMinutes: 50,
    status: 'completed',
    notes: 'Grounding protocols discussed. Patient responding well to Balasana (Child’s Pose) vagal nerve activation.'
  },
  {
    id: 'c-3',
    doctorName: 'Amara Chen, MS, C-IAYT',
    doctorRole: 'Integrative Yoga Therapist & Breathwork Guide',
    doctorAvatar: 'https://images.unsplash.com/photo-1594824813589-fb5ff8134764?auto=format&fit=crop&w=250&q=80',
    specialty: 'Trauma-Informed Somatics & Pranayama',
    dateTime: 'Sep 10, 2026 • 11:00 AM',
    durationMinutes: 45,
    status: 'completed',
    notes: 'Introduced 4-7-8 parasympathetic breathing and restorative evening series.'
  }
];
