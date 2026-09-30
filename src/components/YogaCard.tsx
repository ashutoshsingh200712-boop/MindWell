import React from 'react';
import { Clock, CheckCircle2, Circle, ArrowRight, Sparkles, Wind, Target } from 'lucide-react';
import { YogaPose } from '../types';
import { useApp } from '../context/AppContext';
import { GlowButton } from './GlowButton';

interface YogaCardProps {
  pose: YogaPose;
  onOpenDetails: (pose: YogaPose) => void;
  onStartSession: (pose: YogaPose) => void;
}

export const YogaCard: React.FC<YogaCardProps> = ({ pose, onOpenDetails, onStartSession }) => {
  const { completedPoseIds, togglePoseCompletion } = useApp();
  const isCompleted = completedPoseIds.includes(pose.id);

  const goalColors = {
    'Stress Relief': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    'Sleep': 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    'Focus': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    'Energy': 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  };

  const difficultyColors = {
    'Beginner': 'bg-teal-500/15 text-teal-300 border-teal-500/30',
    'Intermediate': 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    'Advanced': 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30',
  };

  // Duration in minutes
  const minutes = Math.ceil(pose.durationSeconds / 60);

  return (
    <div className={`glass-card p-6 flex flex-col justify-between group transition-all duration-300 ${
      isCompleted ? 'border-purple-400/40 bg-[#161224]' : 'border-purple-500/20'
    }`}>
      <div>
        {/* Top Badges & Completion Toggle */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${goalColors[pose.category]}`}>
              {pose.category}
            </span>
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${difficultyColors[pose.difficulty]}`}>
              {pose.difficulty}
            </span>
          </div>

          <button
            type="button"
            onClick={() => togglePoseCompletion(pose.id)}
            className="flex items-center gap-1.5 text-xs text-purple-300/80 hover:text-white transition-colors"
            title={isCompleted ? 'Mark uncompleted' : 'Mark as completed'}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <Circle className="w-5 h-5 text-purple-500/40 hover:text-purple-300" />
            )}
          </button>
        </div>

        {/* Pose Illustration / Visual Element */}
        <div className="relative w-full h-36 rounded-xl bg-gradient-to-br from-purple-950/50 via-[#130E22] to-[#0D0A17] border border-purple-500/20 mb-4 overflow-hidden flex items-center justify-center group-hover:border-purple-400/50 transition-colors">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_70%)]" />
          
          {/* Stylized Yogic Icon Representation */}
          <div className="relative text-center p-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-900/30 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              <Wind className="w-8 h-8 text-purple-300" />
            </div>
            <span className="block text-[11px] font-serif italic text-purple-300/70 mt-2">
              "{pose.sanskritName}"
            </span>
          </div>

          <span className="absolute bottom-2 right-2 text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#0A0A0F]/80 text-purple-200 border border-purple-500/20 flex items-center gap-1">
            <Clock className="w-3 h-3 text-purple-400" />
            {minutes} min
          </span>
        </div>

        {/* Title & Sanskrit */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors">
            {pose.name}
          </h3>
          <p className="text-xs text-purple-400/80 font-medium">
            Sanskrit: <span className="font-serif italic text-purple-300">{pose.sanskritName}</span>
          </p>
        </div>

        {/* Target Benefit Highlights */}
        <ul className="space-y-1.5 mb-5 text-xs text-[#A1A1B5]">
          {pose.benefits.slice(0, 2).map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Buttons */}
      <div className="pt-3 border-t border-purple-900/30 flex items-center gap-2">
        <GlowButton
          variant="primary"
          size="sm"
          className="flex-1"
          onClick={() => onStartSession(pose)}
        >
          Start Guided
        </GlowButton>
        <button
          type="button"
          onClick={() => onOpenDetails(pose)}
          className="px-3 py-1.5 rounded-full border border-purple-500/30 text-xs text-purple-200 hover:bg-purple-900/40 hover:text-white transition-colors"
        >
          Steps
        </button>
      </div>
    </div>
  );
};
