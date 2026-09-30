import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, User, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GlowButton } from './GlowButton';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SPECIALISTS = [
  {
    name: 'Dr. Sarah Jenkins, MD',
    role: 'Board-Certified Adult Psychiatrist',
    specialty: 'Clinical Evaluations & Medication Management',
    price: '$95 / 60 min',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=250&q=80',
  },
  {
    name: 'Dr. Marcus Vance, PhD',
    role: 'Clinical Psychologist & Somatic Specialist',
    specialty: 'Cognitive Behavioral Therapy (CBT) & Anxiety',
    price: '$45 / 45 min',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=250&q=80',
  },
  {
    name: 'Amara Chen, MS, C-IAYT',
    role: 'Certified Yoga Therapist',
    specialty: 'Trauma-Informed Somatics & Pranayama',
    price: '$45 / 45 min',
    avatar: 'https://images.unsplash.com/photo-1594824813589-fb5ff8134764?auto=format&fit=crop&w=250&q=80',
  },
];

const TIME_SLOTS = [
  'Tomorrow • 10:00 AM',
  'Tomorrow • 2:30 PM',
  'Tomorrow • 4:30 PM',
  'Wednesday • 11:00 AM',
  'Wednesday • 3:00 PM',
  'Thursday • 5:15 PM',
];

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const { bookConsultation } = useApp();
  const [selectedDoctor, setSelectedDoctor] = useState(SPECIALISTS[0]);
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]);
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    bookConsultation({
      doctorName: selectedDoctor.name,
      doctorRole: selectedDoctor.role,
      doctorAvatar: selectedDoctor.avatar,
      specialty: selectedDoctor.specialty,
      dateTime: selectedSlot,
      durationMinutes: 45,
      status: 'upcoming',
      notes: notes || 'Introductory session focused on mental wellness & somatic grounding.',
    });

    setIsSuccess(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="glass-card w-full max-w-xl border border-purple-500/40 p-6 bg-[#130E20]/95 max-h-[92vh] overflow-y-auto"
      >
        {isSuccess ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.3)]">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Consultation Confirmed!</h3>
            <p className="text-sm text-purple-200/80 max-w-md mx-auto">
              Your session with <strong className="text-white">{selectedDoctor.name}</strong> for{' '}
              <strong className="text-white">{selectedSlot}</strong> has been secured. Telehealth links & calendar invites have been dispatched.
            </p>
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
              <div>
                <h3 className="text-xl font-bold text-white">Book a Telehealth Consultation</h3>
                <p className="text-xs text-purple-300">Confidential, encrypted 1-on-1 care</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-purple-300 hover:text-white hover:bg-purple-900/40"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step 1: Select Clinician */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-purple-400 block">
                1. Select Clinician
              </label>
              <div className="space-y-2">
                {SPECIALISTS.map((doc) => {
                  const isSelected = selectedDoctor.name === doc.name;
                  return (
                    <div
                      key={doc.name}
                      onClick={() => setSelectedDoctor(doc)}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-purple-400 bg-purple-950/60 shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                          : 'border-purple-500/20 bg-[#161224]/60 hover:border-purple-500/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={doc.avatar}
                          alt={doc.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/30"
                        />
                        <div>
                          <p className="text-sm font-bold text-white">{doc.name}</p>
                          <p className="text-xs text-purple-300/80">{doc.role}</p>
                          <p className="text-[11px] text-[#A1A1B5]">{doc.specialty}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 rounded-md bg-purple-500/20 text-purple-200 border border-purple-500/30 shrink-0">
                        {doc.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Available Slots */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-purple-400 block">
                2. Choose Open Slot
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all ${
                        isSelected
                          ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                          : 'bg-[#181326] border-purple-500/20 text-purple-200 hover:border-purple-500/40'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Optional Focus Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-purple-400 block">
                3. Primary Reason for Visit (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g., processing work burnout, sleep disruption, wanting grounding yoga routine..."
                rows={2}
                className="w-full bg-[#181326] border border-purple-500/25 rounded-xl px-3 py-2 text-xs text-white placeholder-purple-300/40 focus:outline-none focus:border-purple-400"
              />
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-purple-900/30">
              <div className="flex items-center gap-1.5 text-xs text-emerald-300">
                <ShieldCheck className="w-4 h-4" />
                <span>100% HIPAA Protected Telehealth</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs text-purple-300 hover:text-white"
                >
                  Cancel
                </button>
                <GlowButton variant="primary" size="sm" type="submit">
                  Confirm Booking
                </GlowButton>
              </div>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
