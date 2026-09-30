import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Smile,
  Activity,
  Calendar,
  MessageSquare,
  Settings,
  Bell,
  Flame,
  CheckCircle2,
  Video,
  Clock,
  Sparkles,
  Plus,
  Send,
  Shield,
  Moon,
  Sun,
  User,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts';
import { useApp } from '../context/AppContext';
import { MOCK_MOOD_CHART_30_DAYS, MOCK_YOGA_WEEKLY_DATA } from '../data/mockUserData';
import { YOGA_POSES } from '../data/yogaData';
import { GlowButton } from '../components/GlowButton';
import { BookingModal } from '../components/BookingModal';

type DashboardTab = 'overview' | 'mood' | 'yoga' | 'consultations' | 'chat-history' | 'settings';

export const DashboardPage: React.FC = () => {
  const {
    user,
    updateUser,
    moodHistory,
    addMoodEntry,
    consultations,
    cancelConsultation,
    completedPoseIds,
    toggleChat,
    chatMessages,
    isDarkMode,
    toggleTheme,
  } = useApp();

  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [timeRange, setTimeRange] = useState<'7' | '30'>('30');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // New mood entry form state
  const [newMoodScore, setNewMoodScore] = useState(4);
  const [newMoodEmoji, setNewMoodEmoji] = useState('🙂');
  const [newMoodLabel, setNewMoodLabel] = useState('Calm');
  const [newMoodTag, setNewMoodTag] = useState('Mindful');
  const [newMoodNote, setNewMoodNote] = useState('');

  // Mock Telehealth Call Modal
  const [activeTelehealthRoom, setActiveTelehealthRoom] = useState<string | null>(null);

  const handleMoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    addMoodEntry({
      date: today,
      score: newMoodScore,
      emoji: newMoodEmoji,
      label: newMoodLabel,
      emotionTags: [newMoodTag],
      note: newMoodNote || 'Daily self-reflection entry.',
    });
    setNewMoodNote('');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'mood', label: 'Mood Tracker', icon: Smile },
    { id: 'yoga', label: 'Yoga Progress', icon: Activity },
    { id: 'consultations', label: 'Consultations', icon: Calendar },
    { id: 'chat-history', label: 'Chat History', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Welcome Bar */}
      <div className="glass-card p-6 mb-8 border border-purple-500/25 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#171226] via-[#140F21] to-[#100D1B]">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-500/40 p-0.5"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-[#15121F] rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Good evening, {user.name.split(' ')[0]} 👋
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Member
              </span>
            </div>
            <p className="text-xs sm:text-sm text-purple-300/80">
              Your somatic nervous system baseline is <span className="text-emerald-400 font-semibold">Resilient</span> today.
            </p>
          </div>
        </div>

        {/* Right Badges & Controls */}
        <div className="flex items-center gap-3">
          {/* Streak Badge */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-950/60 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
            <div>
              <p className="text-xs text-purple-300 font-medium">Daily Streak</p>
              <p className="text-sm font-bold text-white leading-none">{user.streakDays} Days</p>
            </div>
          </div>

          {/* Wellness Score Badge */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-950/60 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Sparkles className="w-5 h-5 text-fuchsia-400" />
            <div>
              <p className="text-xs text-purple-300 font-medium">Wellness Score</p>
              <p className="text-sm font-bold text-white leading-none">{user.wellnessScore} / 100</p>
            </div>
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 rounded-xl bg-purple-950/50 border border-purple-500/30 text-purple-300 hover:text-white hover:border-purple-400 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-fuchsia-500 rounded-full" />
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 glass-card p-3 border border-purple-500/30 shadow-2xl z-50 text-xs space-y-2 bg-[#171228]/95">
                <p className="font-bold text-white border-b border-purple-900/40 pb-1.5">Notifications</p>
                <div className="p-2 rounded-lg bg-purple-900/20 text-purple-200">
                  <span className="font-semibold block text-white">Upcoming Session</span>
                  Dr. Sarah Jenkins tomorrow at 4:30 PM.
                </div>
                <div className="p-2 rounded-lg bg-purple-900/20 text-purple-200">
                  <span className="font-semibold block text-white">Streak Maintained!</span>
                  12 consecutive days of somatic awareness.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar + Active Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* ========================================================================= */}
        {/* SIDEBAR NAVIGATION */}
        {/* ========================================================================= */}
        <div className="lg:col-span-1">
          <div className="glass-card p-3 sm:p-4 border border-purple-500/25 space-y-1.5 sticky top-24">
            <p className="text-[10px] font-bold uppercase tracking-wider text-purple-400/80 px-3 py-1">
              Dashboard Navigation
            </p>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as DashboardTab)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-[0_0_18px_rgba(168,85,247,0.35)] border border-purple-400/50'
                      : 'text-purple-200/80 hover:text-white hover:bg-purple-900/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-white" />}
                </button>
              );
            })}

            <div className="pt-4 border-t border-purple-900/30 mt-3 px-2">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full btn-neon-outline text-xs py-2.5 justify-center flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-purple-400" />
                Book Consultation
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN CONTENT AREA */}
        {/* ========================================================================= */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              
              {/* Top Overview Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Upcoming Consultation Widget */}
                {consultations.length > 0 && consultations[0].status === 'upcoming' ? (
                  <div className="glass-card p-6 border border-purple-500/30 bg-gradient-to-br from-[#181326] to-[#120E1E] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          Next Up
                        </span>
                        <span className="text-xs text-purple-300/80 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-purple-400" />
                          {consultations[0].durationMinutes} mins
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <img
                          src={consultations[0].doctorAvatar}
                          alt={consultations[0].doctorName}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/30"
                        />
                        <div>
                          <h4 className="text-base font-bold text-white">{consultations[0].doctorName}</h4>
                          <p className="text-xs text-purple-300">{consultations[0].doctorRole}</p>
                          <p className="text-[11px] text-[#A1A1B5] mt-0.5">{consultations[0].specialty}</p>
                        </div>
                      </div>

                      <p className="text-xs text-purple-200/90 font-medium mb-4 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-purple-400" />
                        {consultations[0].dateTime}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-purple-900/30">
                      <GlowButton
                        variant="primary"
                        size="sm"
                        className="flex-1"
                        icon={<Video className="w-4 h-4" />}
                        onClick={() => setActiveTelehealthRoom(consultations[0].doctorName)}
                      >
                        Join Video Call
                      </GlowButton>
                      <button
                        onClick={() => cancelConsultation(consultations[0].id)}
                        className="px-3 py-1.5 rounded-full border border-purple-500/25 text-xs text-purple-300 hover:text-rose-300 hover:border-rose-500/40"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="glass-card p-6 border border-purple-500/20 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white mb-2">No Upcoming Appointments</h4>
                      <p className="text-xs text-[#A1A1B5] leading-relaxed mb-4">
                        Consult with our Board-Certified Psychiatrists or Clinical Psychologists for personalized guidance.
                      </p>
                    </div>
                    <GlowButton variant="primary" size="sm" onClick={() => setIsBookingOpen(true)}>
                      Schedule Session ($45)
                    </GlowButton>
                  </div>
                )}

                {/* Quick-Access AI Chatbot Shortcut Card */}
                <div className="glass-card p-6 border border-purple-500/30 bg-gradient-to-br from-[#170E28] via-[#140F22] to-[#100D1B] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        24/7 Companion
                      </span>
                      <span className="flex items-center gap-1 text-xs text-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        Online
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-1">Maya AI Companion</h4>
                    <p className="text-xs text-[#A1A1B5] leading-relaxed mb-4">
                      Feeling tense or need to vent? Maya is ready to guide you through anxiety resets, somatic postures, and clinical check-ins.
                    </p>

                    <div className="flex items-center gap-2 text-xs text-purple-300/80 bg-purple-950/40 p-2.5 rounded-xl border border-purple-500/20 mb-4">
                      <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Last checked in: <em>"Grounding protocols with Balasana"</em></span>
                    </div>
                  </div>

                  <GlowButton
                    variant="primary"
                    size="sm"
                    onClick={toggleChat}
                    icon={<MessageSquare className="w-4 h-4" />}
                  >
                    Open Live Chat
                  </GlowButton>
                </div>

              </div>

              {/* Mood Trend Line Chart Card */}
              <div className="glass-card p-6 border border-purple-500/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">Mood & Nervous System Trend</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-emerald-400" /> +18% Resilience
                      </span>
                    </div>
                    <p className="text-xs text-[#A1A1B5]">
                      Tracking emotional valence score (1-5) and sleep quality over time.
                    </p>
                  </div>

                  {/* Toggle Range */}
                  <div className="flex items-center gap-1 bg-[#181326] p-1 rounded-xl border border-purple-500/20 text-xs">
                    <button
                      onClick={() => setTimeRange('7')}
                      className={`px-3 py-1 rounded-lg font-medium transition-all ${
                        timeRange === '7' ? 'bg-purple-600 text-white' : 'text-purple-300 hover:text-white'
                      }`}
                    >
                      7 Days
                    </button>
                    <button
                      onClick={() => setTimeRange('30')}
                      className={`px-3 py-1 rounded-lg font-medium transition-all ${
                        timeRange === '30' ? 'bg-purple-600 text-white' : 'text-purple-300 hover:text-white'
                      }`}
                    >
                      30 Days
                    </button>
                  </div>
                </div>

                {/* Recharts Area Chart */}
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={timeRange === '7' ? MOCK_MOOD_CHART_30_DAYS.slice(-7) : MOCK_MOOD_CHART_30_DAYS}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#A855F7" stopOpacity={0.5} />
                          <stop offset="95%" stopColor="#A855F7" stopOpacity={0.0} />
                        </linearGradient>
                        <linearGradient id="pinkGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#E879F9" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#E879F9" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(168, 85, 247, 0.1)" />
                      <XAxis dataKey="date" stroke="#717188" fontSize={11} tickLine={false} />
                      <YAxis stroke="#717188" fontSize={11} domain={[1, 5]} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#181326',
                          borderColor: 'rgba(168, 85, 247, 0.4)',
                          borderRadius: '0.75rem',
                          color: '#F5F3FF',
                          fontSize: '12px',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="score"
                        name="Mood Score (1-5)"
                        stroke="#C084FC"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#purpleGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Weekly Yoga Completion Bar Chart Card */}
              <div className="glass-card p-6 border border-purple-500/30">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">Yoga & Somatic Practice This Week</h3>
                    <p className="text-xs text-[#A1A1B5]">Minutes spent in conscious somatic grounding.</p>
                  </div>
                  <span className="text-xs font-bold text-purple-300 bg-purple-950/60 px-3 py-1.5 rounded-xl border border-purple-500/30">
                    Total: 195 mins
                  </span>
                </div>

                <div className="w-full h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MOCK_YOGA_WEEKLY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(168, 85, 247, 0.1)" />
                      <XAxis dataKey="day" stroke="#717188" fontSize={11} tickLine={false} />
                      <YAxis stroke="#717188" fontSize={11} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#181326',
                          borderColor: 'rgba(168, 85, 247, 0.4)',
                          borderRadius: '0.75rem',
                          color: '#F5F3FF',
                          fontSize: '12px',
                        }}
                      />
                      <Bar
                        dataKey="minutes"
                        name="Minutes"
                        fill="#9333EA"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 2: MOOD TRACKER */}
          {activeTab === 'mood' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              
              {/* Mood Entry Form */}
              <div className="glass-card p-6 border border-purple-500/30">
                <h3 className="text-lg font-bold text-white mb-2">Log Daily Emotional Reflection</h3>
                <p className="text-xs text-[#A1A1B5] mb-5">
                  Consistent daily logging trains your prefrontal cortex to identify stress triggers before burnout sets in.
                </p>

                <form onSubmit={handleMoodSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-purple-400 block mb-2">
                      Select Primary Valence:
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {[
                        { emoji: '😔', score: 1, label: 'Exhausted' },
                        { emoji: '😕', score: 2, label: 'Anxious' },
                        { emoji: '😐', score: 3, label: 'Balanced' },
                        { emoji: '🙂', score: 4, label: 'Calm' },
                        { emoji: '😊', score: 5, label: 'Joyful' },
                      ].map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => {
                            setNewMoodScore(item.score);
                            setNewMoodEmoji(item.emoji);
                            setNewMoodLabel(item.label);
                          }}
                          className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                            newMoodScore === item.score
                              ? 'bg-purple-600/40 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                              : 'bg-[#181326] border-purple-500/20 text-purple-300 hover:border-purple-400/50'
                          }`}
                        >
                          <span className="text-2xl">{item.emoji}</span>
                          <span className="text-[11px] font-medium">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Emotion Tag Picker */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-purple-400 block mb-2">
                      Primary Factor / Emotion Tag:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Work Deadlines', 'Sleep Restoration', 'Mindful', 'Family', 'Physical Health', 'Gratitude', 'Creative Flow'].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setNewMoodTag(tag)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                            newMoodTag === tag
                              ? 'bg-purple-600 text-white border border-purple-400'
                              : 'bg-[#181326] text-purple-300 border border-purple-500/20 hover:border-purple-400'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Note */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-purple-400 block mb-1">
                      Journal Note (Optional):
                    </label>
                    <textarea
                      value={newMoodNote}
                      onChange={(e) => setNewMoodNote(e.target.value)}
                      placeholder="What felt significant today? Any physical tension in chest or jaw?..."
                      rows={2}
                      className="w-full bg-[#181326] border border-purple-500/25 rounded-xl px-4 py-2.5 text-xs text-white placeholder-purple-300/40 focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <GlowButton variant="primary" size="sm" type="submit">
                    Save Reflection & Maintain Streak
                  </GlowButton>
                </form>
              </div>

              {/* Mood History Log list */}
              <div className="glass-card p-6 border border-purple-500/30 space-y-4">
                <h3 className="text-lg font-bold text-white">Recent Reflection Entries</h3>
                <div className="space-y-2.5">
                  {moodHistory.map((m) => (
                    <div
                      key={m.id}
                      className="p-3.5 rounded-xl bg-[#181326] border border-purple-500/20 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{m.emoji}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{m.label}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                              Score: {m.score}/5
                            </span>
                          </div>
                          {m.note && <p className="text-xs text-[#A1A1B5] mt-0.5">{m.note}</p>}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs text-purple-300/80 font-mono block">{m.date}</span>
                        <div className="flex items-center gap-1 mt-1 justify-end">
                          {m.emotionTags.map((tag) => (
                            <span key={tag} className="text-[10px] text-purple-400">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 3: YOGA PROGRESS */}
          {activeTab === 'yoga' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="glass-card p-6 border border-purple-500/30">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">Somatic Poses Mastered</h3>
                    <p className="text-xs text-[#A1A1B5]">
                      {completedPoseIds.length} of {YOGA_POSES.length} total postures completed
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                    {Math.round((completedPoseIds.length / YOGA_POSES.length) * 100)}% Complete
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {YOGA_POSES.map((pose) => {
                    const isDone = completedPoseIds.includes(pose.id);
                    return (
                      <div
                        key={pose.id}
                        className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
                          isDone
                            ? 'bg-[#191428] border-purple-400/40 text-white'
                            : 'bg-[#15121F] border-purple-500/20 text-[#A1A1B5]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isDone ? 'bg-purple-600/30 text-emerald-400' : 'bg-purple-950/40 text-purple-400'
                          }`}>
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">{pose.name}</p>
                            <p className="text-xs text-purple-300 font-serif italic">{pose.sanskritName}</p>
                          </div>
                        </div>

                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-950/50 text-purple-200 border border-purple-500/30">
                          {pose.category}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: CONSULTATIONS */}
          {activeTab === 'consultations' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="glass-card p-6 border border-purple-500/30 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Clinical Telehealth Consultations</h3>
                  <p className="text-xs text-[#A1A1B5]">
                    Licensed Psychiatrists & Clinical Psychologists for comprehensive evaluations.
                  </p>
                </div>
                <GlowButton variant="primary" size="sm" onClick={() => setIsBookingOpen(true)}>
                  Book New Session
                </GlowButton>
              </div>

              {/* Consultation List */}
              <div className="space-y-4">
                {consultations.map((c) => (
                  <div
                    key={c.id}
                    className="glass-card p-5 border border-purple-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={c.doctorAvatar}
                        alt={c.doctorName}
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-purple-500/30"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-white">{c.doctorName}</h4>
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                              c.status === 'upcoming'
                                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                : c.status === 'completed'
                                ? 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                                : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                            }`}
                          >
                            {c.status}
                          </span>
                        </div>
                        <p className="text-xs text-purple-300/90">{c.doctorRole}</p>
                        <p className="text-xs text-purple-200/80 mt-1 flex items-center gap-1.5 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-purple-400" />
                          {c.dateTime} ({c.durationMinutes} min)
                        </p>
                        {c.notes && <p className="text-xs text-[#A1A1B5] mt-1 italic">Notes: {c.notes}</p>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {c.status === 'upcoming' && (
                        <GlowButton
                          variant="primary"
                          size="sm"
                          icon={<Video className="w-4 h-4" />}
                          onClick={() => setActiveTelehealthRoom(c.doctorName)}
                        >
                          Join Telehealth Room
                        </GlowButton>
                      )}
                      {c.status === 'completed' && (
                        <button className="px-3 py-1.5 rounded-full border border-purple-500/30 text-xs text-purple-200 hover:text-white">
                          View Summary
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 5: CHAT HISTORY */}
          {activeTab === 'chat-history' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="glass-card p-6 border border-purple-500/30 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Maya AI Companion Transcripts</h3>
                  <p className="text-xs text-[#A1A1B5]">
                    Encrypted on-device chat history with your AI wellness guide.
                  </p>
                </div>
                <GlowButton variant="primary" size="sm" onClick={toggleChat}>
                  Open Active Chat
                </GlowButton>
              </div>

              <div className="glass-card p-6 border border-purple-500/25 space-y-4 max-h-[500px] overflow-y-auto">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-purple-900/30 text-purple-100 border border-purple-500/30 ml-8'
                        : 'bg-[#181326] text-[#A1A1B5] border border-purple-500/15 mr-8'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-purple-400 mb-1 font-semibold">
                      <span>{msg.sender === 'user' ? 'You' : 'Maya (AI)'}</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="glass-card p-6 border border-purple-500/30 space-y-6">
                <h3 className="text-lg font-bold text-white">Account & Wellness Preferences</h3>

                {/* Profile fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-purple-400 block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) => updateUser({ name: e.target.value })}
                      className="w-full bg-[#181326] border border-purple-500/25 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-purple-400 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) => updateUser({ email: e.target.value })}
                      className="w-full bg-[#181326] border border-purple-500/25 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                {/* Theme toggle */}
                <div className="pt-4 border-t border-purple-900/30 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Visual Mode</h4>
                    <p className="text-xs text-[#A1A1B5]">
                      MindWell is styled with Dark Neon Purple by default for ocular comfort.
                    </p>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-xs font-semibold text-purple-200 hover:text-white"
                  >
                    {isDarkMode ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
                    <span>{isDarkMode ? 'Dark Neon (Active)' : 'Light Mode'}</span>
                  </button>
                </div>

                {/* Privacy & Safety Data Controls */}
                <div className="pt-4 border-t border-purple-900/30 space-y-3">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    HIPAA & Privacy Controls
                  </h4>
                  <p className="text-xs text-[#A1A1B5]">
                    Your biometric logs and conversational records are protected under zero-knowledge encryption. You can export or clear your chat records at any time.
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => alert("Your encrypted health archive (JSON) has been exported.")}
                      className="px-3.5 py-1.5 rounded-lg bg-purple-900/40 border border-purple-500/30 text-xs text-purple-200 hover:text-white"
                    >
                      Export Health Archive
                    </button>
                    <button
                      onClick={() => alert("Personal session logs cleared.")}
                      className="px-3.5 py-1.5 rounded-lg border border-rose-500/30 text-xs text-rose-300 hover:bg-rose-950/40"
                    >
                      Purge Ephemeral Chat Logs
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </div>

      </div>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Telehealth Mock Video Call Modal */}
      {activeTelehealthRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="glass-card w-full max-w-2xl border border-purple-500/40 p-6 bg-[#130E20]/95 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <h3 className="text-base font-bold text-white">Live HIPAA Telehealth Room</h3>
              </div>
              <button
                onClick={() => setActiveTelehealthRoom(null)}
                className="text-xs text-purple-300 hover:text-white px-3 py-1.5 rounded-lg border border-purple-500/30"
              >
                End Call
              </button>
            </div>

            <div className="w-full h-72 rounded-2xl bg-[#09070F] border border-purple-500/25 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="w-20 h-20 rounded-full bg-purple-900/40 border border-purple-500/40 flex items-center justify-center text-purple-300 mb-3 shadow-[0_0_25px_rgba(168,85,247,0.3)]">
                <Video className="w-10 h-10" />
              </div>
              <p className="text-sm font-semibold text-white">Connecting with {activeTelehealthRoom}...</p>
              <p className="text-xs text-purple-300/80 mt-1">End-to-End Encrypted Telehealth Feed (Mock Room)</p>
            </div>

            <div className="flex items-center justify-between text-xs text-purple-300">
              <span>Encrypted Session ID: MW-7819-TLS</span>
              <button
                onClick={() => setActiveTelehealthRoom(null)}
                className="px-4 py-2 rounded-full bg-rose-600 text-white font-semibold"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
