import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Filter, CheckCircle2, Flame, RotateCcw, Wind, Heart, Activity } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { YOGA_POSES } from '../data/yogaData';
import { YogaDifficulty, YogaGoal, YogaPose } from '../types';
import { YogaCard } from '../components/YogaCard';
import { GuidedYogaModal } from '../components/GuidedYogaModal';
import { PoseDetailModal } from '../components/PoseDetailModal';
import { GlowButton } from '../components/GlowButton';

export const YogaPage: React.FC = () => {
  const { completedPoseIds, user } = useApp();
  const [selectedGoal, setSelectedGoal] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [activeSessionPose, setActiveSessionPose] = useState<YogaPose | null>(null);
  const [detailModalPose, setDetailModalPose] = useState<YogaPose | null>(null);

  const goals = ['All', 'Stress Relief', 'Sleep', 'Focus', 'Energy'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Filter poses
  const filteredPoses = YOGA_POSES.filter((pose) => {
    const matchesGoal = selectedGoal === 'All' || pose.category === selectedGoal;
    const matchesDifficulty = selectedDifficulty === 'All' || pose.difficulty === selectedDifficulty;
    return matchesGoal && matchesDifficulty;
  });

  const totalPoses = YOGA_POSES.length;
  const completedCount = completedPoseIds.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalPoses) * 100));

  return (
    <div className="min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs font-semibold text-purple-300">
            <Activity className="w-3.5 h-3.5 text-purple-400" />
            <span>Somatic Neuro-Regulation & Yoga Sanctuary</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Ground your mind through embodied movement.
          </h1>

          <p className="text-sm sm:text-base text-[#A1A1B5] leading-relaxed">
            Targeted yogic postures, pranayama breathing cycles, and vagal nerve activations curated to calm high cortisol, melt somatic tension, and restore restorative sleep.
          </p>
        </div>

        {/* Progress Tracker Strip at Top */}
        <div className="glass-card p-5 sm:p-6 mb-10 border border-purple-500/30 bg-gradient-to-r from-[#171226] via-[#140F22] to-[#110D1D]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-900/50 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Today's Somatic Practice: <span className="text-purple-300">{completedCount} of {totalPoses} poses completed</span>
                </h3>
                <p className="text-xs text-purple-400/80">
                  {completedCount >= 3 ? '🎉 Daily somatic goal met! Keep going or rest.' : 'Complete 3 poses to lock in your daily mindfulness streak.'}
                </p>
              </div>
            </div>

            {/* Streak & Time */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs font-bold text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>{user.streakDays} Day Streak</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-900/40 border border-purple-500/30 text-xs font-semibold text-purple-200">
                <Wind className="w-4 h-4 text-purple-400" />
                <span>~{Math.round(completedCount * 3.5)} min practiced</span>
              </div>
            </div>
          </div>

          {/* Glowing Progress Bar */}
          <div className="w-full bg-[#0A0A0F] h-3 rounded-full overflow-hidden border border-purple-900/50 p-0.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-emerald-400 shadow-[0_0_15px_rgba(168,85,247,0.7)]"
            />
          </div>
        </div>

        {/* Filter / Sort Control Bar */}
        <div className="glass-card p-4 sm:p-5 mb-8 border border-purple-500/25 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Goal Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Goal:
            </span>
            {goals.map((goal) => (
              <button
                key={goal}
                onClick={() => setSelectedGoal(goal)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedGoal === goal
                    ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)] border border-purple-400'
                    : 'bg-[#181326] text-purple-300/80 border border-purple-500/20 hover:text-white hover:border-purple-500/40'
                }`}
              >
                {goal}
              </button>
            ))}
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 mr-1">
              Difficulty:
            </span>
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-fuchsia-600 text-white shadow-[0_0_12px_rgba(232,121,249,0.4)] border border-fuchsia-400'
                    : 'bg-[#181326] text-purple-300/80 border border-purple-500/20 hover:text-white hover:border-purple-500/40'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

        </div>

        {/* Postures Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPoses.map((pose) => (
            <YogaCard
              key={pose.id}
              pose={pose}
              onOpenDetails={(p) => setDetailModalPose(p)}
              onStartSession={(p) => setActiveSessionPose(p)}
            />
          ))}
        </div>

        {/* Active Guided Session Modal */}
        {activeSessionPose && (
          <GuidedYogaModal
            pose={activeSessionPose}
            onClose={() => setActiveSessionPose(null)}
          />
        )}

        {/* Detail Modal */}
        {detailModalPose && (
          <PoseDetailModal
            pose={detailModalPose}
            onClose={() => setDetailModalPose(null)}
            onStartSession={(p) => {
              setDetailModalPose(null);
              setActiveSessionPose(p);
            }}
          />
        )}

      </div>
    </div>
  );
};
