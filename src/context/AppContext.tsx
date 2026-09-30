import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChatMessage, Consultation, MoodEntry, UserProfile, YogaPose } from '../types';
import { CURRENT_USER, MOCK_CONSULTATIONS, MOCK_MOOD_HISTORY } from '../data/mockUserData';
import { YOGA_POSES } from '../data/yogaData';

interface AppContextType {
  // Chat Widget State
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  toggleChat: () => void;
  chatMessages: ChatMessage[];
  isBotTyping: boolean;
  sendChatMessage: (content: string) => Promise<void>;
  resetChat: () => void;
  selectedMood: string | null;
  handleMoodSelect: (moodEmoji: string, label: string) => void;

  // Yoga State
  completedPoseIds: string[];
  togglePoseCompletion: (poseId: string) => void;
  activeSessionPose: YogaPose | null;
  setActiveSessionPose: (pose: YogaPose | null) => void;

  // User & Dashboard State
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
  moodHistory: MoodEntry[];
  addMoodEntry: (entry: Omit<MoodEntry, 'id'>) => void;
  consultations: Consultation[];
  bookConsultation: (consultation: Omit<Consultation, 'id'>) => void;
  cancelConsultation: (id: string) => void;

  // Theme State
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'bot',
    text: "Hello, I’m Maya, your MindWell companion. 💜 Whether you're feeling overwhelmed, looking for a calming yoga posture, or ready to connect with a clinical specialist, I’m here without judgment.",
    timestamp: 'Just now',
  },
  {
    id: 'msg-2',
    sender: 'bot',
    text: "Before we begin, how are you feeling right now at this moment?",
    timestamp: 'Just now',
    quickReplies: ['😔 Stressed / Low', '😐 Neutral / Busy', '🙂 Calm / Good', '😊 Energized'],
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Chat state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('mindwell_chat_msgs');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  // Yoga state
  const [completedPoseIds, setCompletedPoseIds] = useState<string[]>(['pose-1', 'pose-2', 'pose-5']);
  const [activeSessionPose, setActiveSessionPose] = useState<YogaPose | null>(null);

  // User & Dashboard state
  const [user, setUser] = useState<UserProfile>(CURRENT_USER);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>(MOCK_MOOD_HISTORY);
  const [consultations, setConsultations] = useState<Consultation[]>(MOCK_CONSULTATIONS);

  // Theme
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    localStorage.setItem('mindwell_chat_msgs', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const toggleChat = () => setIsChatOpen(prev => !prev);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const togglePoseCompletion = (poseId: string) => {
    setCompletedPoseIds(prev => {
      const exists = prev.includes(poseId);
      const next = exists ? prev.filter(id => id !== poseId) : [...prev, poseId];
      // update user profile stats
      setUser(u => ({
        ...u,
        totalPosesCompleted: next.length,
        wellnessScore: Math.min(100, 70 + next.length * 3)
      }));
      return next;
    });
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const addMoodEntry = (entry: Omit<MoodEntry, 'id'>) => {
    const newEntry: MoodEntry = {
      ...entry,
      id: `m-${Date.now()}`
    };
    setMoodHistory(prev => [newEntry, ...prev]);
    setUser(u => ({ ...u, streakDays: u.streakDays + 1 }));
  };

  const bookConsultation = (consultation: Omit<Consultation, 'id'>) => {
    const newConsultation: Consultation = {
      ...consultation,
      id: `c-${Date.now()}`,
      status: 'upcoming',
      meetingLink: `https://mindwell.care/telehealth/session/live-${Math.floor(100 + Math.random() * 900)}`
    };
    setConsultations(prev => [newConsultation, ...prev]);
  };

  const cancelConsultation = (id: string) => {
    setConsultations(prev =>
      prev.map(c => (c.id === id ? { ...c, status: 'cancelled' } : c))
    );
  };

  const handleMoodSelect = (moodEmoji: string, label: string) => {
    setSelectedMood(`${moodEmoji} ${label}`);
    sendChatMessage(`${moodEmoji} ${label}`);
  };

  const resetChat = () => {
    setChatMessages(INITIAL_MESSAGES);
    setSelectedMood(null);
  };

  /**
   * ===========================================================================
   * MOCK AI RESPONSE GENERATOR
   * ===========================================================================
   * NOTE: To connect a live backend or Gemini API, replace the setTimeout block
   * below with an API call (e.g., fetch('/api/chat', ...) or gemini.generateContent).
   * The responses below handle mood onboarding, yoga suggestions, clinical triage,
   * crisis detection, and booking coordination.
   */
  const sendChatMessage = async (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages(prev => [...prev, userMsg]);
    setIsBotTyping(true);

    // Simulate natural AI thinking & typing cadence (700-1400ms)
    setTimeout(() => {
      const lower = userText.toLowerCase();
      let botResponseText = "";
      let replies: string[] | undefined = undefined;

      // Crisis detection protocol
      if (lower.includes('suicide') || lower.includes('kill myself') || lower.includes('end it all') || lower.includes('harm myself')) {
        botResponseText = "⚠️ I hear how deeply painful things feel right now, but please know you don't have to carry this alone. MindWell is an automated companion and cannot provide emergency medical care.\n\nImmediate 24/7 help is available:\n• Call or text 988 (Suicide & Crisis Lifeline - Free & Confidential)\n• Text HOME to 741741 to reach Crisis Text Line\n• If in immediate physical danger, please contact 911 or visit your nearest emergency room.";
        replies = ['Call 988 Lifeline', 'Find Local Emergency Support', 'I am safe now'];
      }
      // Mood onboarding responses
      else if (lower.includes('stressed') || lower.includes('low') || lower.includes('😔')) {
        botResponseText = "Thank you for sharing that with me. It takes real courage to acknowledge when things feel heavy. When stress spikes, our sympathetic nervous system goes into overdrive. Would you like a 3-minute somatic breathwork exercise, a calming yoga pose (like Child's Pose), or would you prefer to explore speaking with a licensed clinician?";
        replies = ['Child’s Pose (Balasana)', 'Try 4-7-8 Breathing', 'Book a Consultation', 'Just talk'];
      }
      else if (lower.includes('neutral') || lower.includes('busy') || lower.includes('😐')) {
        botResponseText = "Recognizing neutral or busy states is wonderful mindfulness. Sometimes busyness drains our batteries without us noticing. Would you like to do a quick 2-minute posture reset, log your daily mood in the dashboard, or check upcoming therapy slots?";
        replies = ['Quick Posture Reset', 'Log Mood Entry', 'Explore Yoga Library'];
      }
      else if (lower.includes('calm') || lower.includes('good') || lower.includes('🙂') || lower.includes('😊') || lower.includes('energized')) {
        botResponseText = "That’s wonderful to hear! ✨ Carrying this positive momentum forward can anchor your resilience for future stressful moments. What would support your day best right now?";
        replies = ['Start Energy Flow Yoga', 'View My Dashboard Streak', 'Learn about Care Team'];
      }
      // Yoga trigger
      else if (lower.includes('yoga') || lower.includes('pose') || lower.includes('balasana') || lower.includes('posture')) {
        botResponseText = "Somatic movement is one of the most clinically validated ways to release cortisol and reset your vagus nerve. I recommend Balasana (Child's Pose) for stress or Viparita Karani (Legs Up The Wall) for restorative rest. You can launch the interactive guided timer with real-time breathing cues right now!";
        replies = ['Open Yoga Section', 'Start Child’s Pose Now', 'Back to options'];
      }
      // Consultation booking
      else if (lower.includes('book') || lower.includes('doctor') || lower.includes('therapist') || lower.includes('psychiatrist') || lower.includes('consultation')) {
        botResponseText = "Our multidisciplinary care team includes Board-Certified Psychiatrists (for evaluations & prescriptions) and Clinical Psychologists (for CBT & somatic therapy). Sessions are $45 for 45 minutes with no recurring subscriptions.\n\nWould you like me to open the instant booking scheduler?";
        replies = ['Open Consultations', 'Who is on the team?', 'Check Student Discount'];
      }
      // Breathing exercise
      else if (lower.includes('breath') || lower.includes('4-7-8') || lower.includes('anxiety')) {
        botResponseText = "Let’s ground your nervous system together right now:\n\n1. Inhale gently through your nose for 4 seconds.\n2. Hold your breath calmly for 7 seconds.\n3. Slowly exhale through your mouth for 8 seconds with a soft 'whoosh'.\n\nNotice how your shoulder blades drop away from your ears. How does that feel?";
        replies = ['That helped a lot', 'Repeat breathing cycle', 'Show me yoga poses'];
      }
      // FAQ / About
      else if (lower.includes('price') || lower.includes('cost') || lower.includes('discount')) {
        botResponseText = "MindWell AI chat, guided breathing, and all yoga postures are 100% free! Telehealth consultations with our licensed therapists are $45/session ($95 for psychiatric evaluations). Plus, enrolled students get an automatic 30% discount.";
        replies = ['Book a session', 'Read Full Pricing FAQs', 'Ask another question'];
      }
      else {
        botResponseText = `I hear you. You mentioned: "${userText}". As your MindWell companion, I’m trained to help you unpack those thoughts, ground your physical sensations, or connect you with the right specialist. Where shall we direct our attention?`;
        replies = ['Guided Yoga Pose', 'Book a Consultation', 'Daily Mood Check-in', 'Talk more'];
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies: replies,
      };

      setChatMessages(prev => [...prev, botMsg]);
      setIsBotTyping(false);
    }, 900);
  };

  return (
    <AppContext.Provider
      value={{
        isChatOpen,
        setIsChatOpen,
        toggleChat,
        chatMessages,
        isBotTyping,
        sendChatMessage,
        resetChat,
        selectedMood,
        handleMoodSelect,
        completedPoseIds,
        togglePoseCompletion,
        activeSessionPose,
        setActiveSessionPose,
        user,
        updateUser,
        moodHistory,
        addMoodEntry,
        consultations,
        bookConsultation,
        cancelConsultation,
        isDarkMode,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
