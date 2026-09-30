import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2, AlertOctagon, Heart, Wind, Sparkles } from 'lucide-react';
import { YogaPose } from '../types';
import { GlowButton } from './GlowButton';

interface PoseDetailModalProps {
  pose: YogaPose;
  onClose: () => void;
  onStartSession: (pose: YogaPose) => void;
}

export const PoseDetailModal: React.FC<PoseDetailModalProps> = ({ pose, onClose, onStartSession }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass-card w-full max-w-xl max-h-[90vh] overflow-y-auto border border-purple-500/35 p-6 bg-[#130E20]/95"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-purple-500/20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {pose.category}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
                {pose.difficulty}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white">{pose.name}</h2>
            <p className="text-sm font-serif italic text-purple-300">{pose.sanskritName}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-purple-950/50 border border-purple-500/30 text-purple-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Benefits */}
        <div className="py-4 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-purple-400" />
            Key Neurological & Physical Benefits
          </h3>
          <ul className="space-y-1.5 text-sm text-[#A1A1B5]">
            {pose.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Steps */}
        <div className="py-4 border-t border-purple-900/30 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
            Step-by-Step Instructions
          </h3>
          <ol className="space-y-2 text-sm text-[#A1A1B5]">
            {pose.steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-purple-900/60 border border-purple-500/40 text-purple-200 text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Breathing Cues */}
        <div className="py-4 border-t border-purple-900/30 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
            <Wind className="w-3.5 h-3.5 text-purple-400" />
            Pranayama & Breathing Cadence
          </h3>
          <ul className="space-y-1.5 text-sm text-purple-200/80 bg-purple-950/40 p-3 rounded-xl border border-purple-500/20">
            {pose.breathingCues.map((cue, idx) => (
              <li key={idx}>• {cue}</li>
            ))}
          </ul>
        </div>

        {/* Contraindications */}
        {pose.contraindications.length > 0 && (
          <div className="py-4 border-t border-purple-900/30 space-y-1.5 text-xs text-rose-300/80">
            <h4 className="font-semibold text-rose-400 flex items-center gap-1">
              <AlertOctagon className="w-3.5 h-3.5" />
              Precautions / Modifications
            </h4>
            <p>{pose.contraindications.join(' • ')}</p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-4 border-t border-purple-900/30 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-purple-500/30 text-sm text-purple-300 hover:text-white"
          >
            Close
          </button>
          <GlowButton
            variant="primary"
            onClick={() => {
              onClose();
              onStartSession(pose);
            }}
          >
            Start Guided Session ({Math.ceil(pose.durationSeconds / 60)} min)
          </GlowButton>
        </div>
      </motion.div>
    </div>
  );
};
