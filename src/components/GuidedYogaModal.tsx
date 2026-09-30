import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  CheckCircle,
  Wind,
  Volume2,
  VolumeX,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { YogaPose } from '../types';
import { YOGA_POSES } from '../data/yogaData';
import { useApp } from '../context/AppContext';
import { GlowButton } from './GlowButton';

interface GuidedYogaModalProps {
  pose: YogaPose;
  onClose: () => void;
}

export const GuidedYogaModal: React.FC<GuidedYogaModalProps> = ({ pose: initialPose, onClose }) => {
  const { togglePoseCompletion, completedPoseIds } = useApp();
  const [currentPose, setCurrentPose] = useState<YogaPose>(initialPose);
  const [timeLeft, setTimeLeft] = useState<number>(initialPose.durationSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathTimer, setBreathTimer] = useState<number>(4);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [completedThisSession, setCompletedThisSession] = useState<boolean>(false);

  // When currentPose changes, reset countdown timer
  useEffect(() => {
    setTimeLeft(currentPose.durationSeconds);
    setIsRunning(true);
    setCompletedThisSession(false);
  }, [currentPose]);

  // Main countdown timer
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  // Breathing cycle animation (Inhale 4s -> Hold 2s -> Exhale 6s)
  useEffect(() => {
    if (!isRunning) return;

    const breathInterval = setInterval(() => {
      setBreathTimer(prev => {
        if (prev <= 1) {
          if (breathPhase === 'Inhale') {
            setBreathPhase('Hold');
            return 2;
          } else if (breathPhase === 'Hold') {
            setBreathPhase('Exhale');
            return 6;
          } else {
            setBreathPhase('Inhale');
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(breathInterval);
  }, [isRunning, breathPhase]);

  const handleFinish = () => {
    setIsRunning(false);
    setCompletedThisSession(true);
    if (!completedPoseIds.includes(currentPose.id)) {
      togglePoseCompletion(currentPose.id);
    }
    // Fire celebratory confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#A855F7', '#C084FC', '#E879F9', '#38BDF8', '#34D399'],
    });
  };

  const handleNextPose = () => {
    const currentIndex = YOGA_POSES.findIndex(p => p.id === currentPose.id);
    const nextIndex = (currentIndex + 1) % YOGA_POSES.length;
    setCurrentPose(YOGA_POSES[nextIndex]);
  };

  const handlePrevPose = () => {
    const currentIndex = YOGA_POSES.findIndex(p => p.id === currentPose.id);
    const prevIndex = (currentIndex - 1 + YOGA_POSES.length) % YOGA_POSES.length;
    setCurrentPose(YOGA_POSES[prevIndex]);
  };

  // Circular progress calculations
  const total = currentPose.durationSeconds;
  const progressPercent = ((total - timeLeft) / total) * 100;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        className="glass-card w-full max-w-2xl border border-purple-500/40 p-6 sm:p-8 bg-[#110D1D]/95 relative overflow-hidden"
      >
        {/* Top Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-purple-500/20 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-widest text-purple-400">
                Guided Somatic Session
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {currentPose.category}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {currentPose.name}{' '}
              <span className="text-sm font-serif italic text-purple-300">
                ({currentPose.sanskritName})
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl bg-purple-950/50 border border-purple-500/30 text-purple-300 hover:text-white"
              title={soundEnabled ? 'Mute ambient chimes' : 'Unmute chimes'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-purple-950/50 border border-purple-500/30 text-purple-300 hover:text-white"
              title="Close session"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Timer & Breathing Ring */}
        <div className="py-8 flex flex-col items-center justify-center relative z-10">
          <div className="relative w-56 h-56 flex items-center justify-center">
            {/* Ambient Breathing Pulse Circle */}
            <div
              className={`absolute inset-4 rounded-full border border-purple-400/30 transition-all duration-1000 ${
                breathPhase === 'Inhale'
                  ? 'scale-110 bg-purple-600/20 shadow-[0_0_40px_rgba(168,85,247,0.4)]'
                  : breathPhase === 'Hold'
                  ? 'scale-110 bg-fuchsia-600/25 shadow-[0_0_50px_rgba(232,121,249,0.5)]'
                  : 'scale-90 bg-purple-950/40 shadow-none'
              }`}
            />

            {/* Circular Progress Ring */}
            <svg className="w-full h-full -rotate-90 transform">
              <circle
                cx="112"
                cy="112"
                r={radius}
                className="stroke-purple-950/80"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="112"
                cy="112"
                r={radius}
                className="stroke-purple-500 transition-all duration-500"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(168,85,247,0.8))',
                }}
              />
            </svg>

            {/* Timer Display inside Ring */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-bold font-mono text-white tracking-wider">
                {formattedTime}
              </span>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-purple-300 font-semibold uppercase tracking-wider">
                <Wind className="w-3.5 h-3.5 text-purple-400 animate-spin" />
                <span>{breathPhase} ({breathTimer}s)</span>
              </div>
            </div>
          </div>

          {/* Real-time Breathing Cue Text */}
          <div className="mt-4 text-center">
            <p className="text-sm font-medium text-purple-200">
              {breathPhase === 'Inhale' && 'Slowly breathe in deep through your nostrils, expanding the belly...'}
              {breathPhase === 'Hold' && 'Hold gently at the top. Allow your mind to become still...'}
              {breathPhase === 'Exhale' && 'Smoothly exhale through the mouth. Drop your shoulder tension...'}
            </p>
          </div>
        </div>

        {/* Step instruction strip */}
        <div className="bg-[#181326] border border-purple-500/20 rounded-2xl p-4 mb-6 relative z-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-1">
            Focus & Posture Alignment:
          </p>
          <p className="text-xs sm:text-sm text-[#A1A1B5] leading-relaxed">
            {currentPose.steps[0]} {currentPose.steps[1]}
          </p>
        </div>

        {/* Control Navigation Bar */}
        <div className="flex items-center justify-between gap-4 pt-2 relative z-10">
          <button
            onClick={handlePrevPose}
            className="flex items-center gap-1.5 text-xs text-purple-300 hover:text-white px-3 py-2 rounded-xl hover:bg-purple-900/30 transition-colors"
          >
            <SkipBack className="w-4 h-4" />
            <span className="hidden sm:inline">Prev Pose</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="p-3.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:brightness-110 active:scale-95 transition-all"
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            <button
              onClick={() => {
                setTimeLeft(currentPose.durationSeconds);
                setIsRunning(true);
              }}
              className="p-3 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-900/40 transition-colors"
              title="Restart Pose"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <GlowButton
              variant="outline"
              size="sm"
              onClick={handleFinish}
              icon={<CheckCircle className="w-4 h-4 text-emerald-400" />}
            >
              {completedThisSession ? 'Completed!' : 'Mark Done'}
            </GlowButton>
          </div>

          <button
            onClick={handleNextPose}
            className="flex items-center gap-1.5 text-xs text-purple-300 hover:text-white px-3 py-2 rounded-xl hover:bg-purple-900/30 transition-colors"
          >
            <span className="hidden sm:inline">Next Pose</span>
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
