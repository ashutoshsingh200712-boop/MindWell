import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Bot,
  User,
  Send,
  Mic,
  MicOff,
  RotateCcw,
  ShieldCheck,
  Heart,
  Wind,
  Activity,
  Calendar,
  PhoneCall
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GlowButton } from '../components/GlowButton';
import { BookingModal } from '../components/BookingModal';

export const ChatPage: React.FC = () => {
  const {
    chatMessages,
    isBotTyping,
    sendChatMessage,
    resetChat,
    handleMoodSelect,
    selectedMood
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isBotTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendChatMessage(inputVal);
    setInputVal('');
  };

  const handleVoiceMock = () => {
    if (!isListening) {
      setIsListening(true);
      setInputVal("I'm feeling anxious about tomorrow and my chest feels slightly tight.");
      setTimeout(() => setIsListening(false), 2200);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="min-h-screen py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
      
      {/* Top Banner */}
      <div className="glass-card p-6 mb-6 border border-purple-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#171226] via-[#140F21] to-[#100D1B]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-purple-500 to-fuchsia-400 p-[1px] shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <div className="w-full h-full bg-[#110D1D] rounded-2xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-purple-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white">Maya Sanctuary Companion</h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active Session
              </span>
            </div>
            <p className="text-xs sm:text-sm text-purple-300/80">
              HIPAA-Compliant Conversational Mental Health & Somatic Grounding
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/50 border border-purple-500/30 text-xs text-purple-300 hover:text-white"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Chat</span>
          </button>
          <GlowButton
            variant="outline"
            size="sm"
            onClick={() => setIsBookingOpen(true)}
            icon={<Calendar className="w-4 h-4 text-purple-400" />}
          >
            Book Clinician
          </GlowButton>
        </div>
      </div>

      {/* Main Full-Height Chat Container */}
      <div className="flex-1 glass-card border border-purple-500/30 flex flex-col overflow-hidden h-[680px] shadow-[0_0_40px_rgba(168,85,247,0.15)] bg-[#120E1E]">
        
        {/* Mood Check-In Header Strip */}
        <div className="px-6 py-3 bg-[#171228] border-b border-purple-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-purple-300 font-medium">Quick Valence Calibration:</span>
          <div className="flex items-center gap-2">
            {[
              { emoji: '😔', label: 'Stressed / Low' },
              { emoji: '😐', label: 'Neutral / Busy' },
              { emoji: '🙂', label: 'Calm / Good' },
              { emoji: '😊', label: 'Energized' },
            ].map((m) => (
              <button
                key={m.label}
                onClick={() => handleMoodSelect(m.emoji, m.label)}
                className="px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 hover:border-purple-400 text-purple-200 hover:text-white transition-all flex items-center gap-1.5"
              >
                <span>{m.emoji}</span>
                <span className="hidden sm:inline">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-gradient-to-b from-[#110D1D] to-[#0A0A0F]">
          {chatMessages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-end gap-3 max-w-[80%]">
                  {!isUser && (
                    <div className="w-8 h-8 rounded-full bg-purple-900/60 border border-purple-500/40 flex items-center justify-center shrink-0 mb-1 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`rounded-2xl px-5 py-3.5 text-sm sm:text-base leading-relaxed ${
                      isUser
                        ? 'bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.35)] rounded-br-none'
                        : 'bg-[#181328] text-[#F5F3FF] border-l-4 border-l-purple-400 border border-purple-500/20 shadow-lg rounded-bl-none whitespace-pre-line'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {isUser && (
                    <div className="w-8 h-8 rounded-full bg-fuchsia-900/60 border border-fuchsia-500/40 flex items-center justify-center shrink-0 mb-1 text-fuchsia-300">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <span className="text-[11px] text-purple-400/50 mt-1 px-11">
                  {msg.timestamp}
                </span>

                {/* Quick replies */}
                {!isUser && msg.quickReplies && (
                  <div className="flex flex-wrap gap-2 mt-2 pl-11">
                    {msg.quickReplies.map((reply) => (
                      <button
                        key={reply}
                        onClick={() => sendChatMessage(reply)}
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-950/70 text-purple-200 border border-purple-500/35 hover:border-purple-300 hover:bg-purple-900/50 hover:text-white transition-all shadow-[0_0_12px_rgba(168,85,247,0.15)] active:scale-95"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {isBotTyping && (
            <div className="flex items-center gap-3 pl-1">
              <div className="w-8 h-8 rounded-full bg-purple-900/60 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#181328] border border-purple-500/20 rounded-2xl rounded-bl-none px-5 py-3.5 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSubmit}
          className="p-4 bg-[#140F22] border-t border-purple-500/25 flex items-center gap-3"
        >
          <button
            type="button"
            onClick={handleVoiceMock}
            className={`p-3 rounded-xl border transition-all ${
              isListening
                ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse'
                : 'bg-purple-950/40 border-purple-500/30 text-purple-300 hover:text-white hover:border-purple-400'
            }`}
            title="Simulate Speech Input"
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={isListening ? 'Listening...' : 'Share what is on your mind or ask for a calming posture...'}
            className="flex-1 bg-[#1B152B] border border-purple-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-purple-300/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
          />

          <GlowButton
            variant="primary"
            size="md"
            type="submit"
            disabled={!inputVal.trim() && !isListening}
            icon={<Send className="w-4 h-4" />}
          >
            Send
          </GlowButton>
        </form>

      </div>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

    </div>
  );
};
