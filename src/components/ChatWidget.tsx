import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Mic,
  MicOff,
  Sparkles,
  RotateCcw,
  Maximize2,
  Minimize2,
  Heart,
  Bot,
  User,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ChatWidget: React.FC = () => {
  const {
    isChatOpen,
    setIsChatOpen,
    toggleChat,
    chatMessages,
    isBotTyping,
    sendChatMessage,
    resetChat,
    selectedMood,
    handleMoodSelect
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isBotTyping, isChatOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isChatOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText('');
  };

  const toggleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true);
      // Simulate speech recognition
      setInputText("I'm feeling a bit restless and need a relaxing breathing technique.");
      setTimeout(() => {
        setIsListening(false);
      }, 2500);
    } else {
      setIsListening(false);
    }
  };

  return (
    <>
      {/* Floating Action Button (bottom-right) with Pulsing Glow */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* WhatsApp direct pill (Reference inspiration) */}
        {!isChatOpen && (
          <a
            href="https://web.whatsapp.com"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#15121F]/90 border border-emerald-500/40 text-emerald-300 text-xs font-medium shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:bg-emerald-950/40 hover:border-emerald-400 transition-all hover:scale-105"
            title="Chat with MindWell on WhatsApp"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Chat on WhatsApp</span>
          </a>
        )}

        <button
          type="button"
          onClick={toggleChat}
          aria-label={isChatOpen ? 'Close chat' : 'Open MindWell AI companion'}
          className={`relative p-4 rounded-full text-white shadow-2xl transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-400 ${
            isChatOpen
              ? 'bg-purple-900 border border-purple-400/50 rotate-90 scale-95'
              : 'floating-ai-trigger hover:scale-110'
          }`}
        >
          {isChatOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <MessageCircle className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-fuchsia-400 rounded-full border-2 border-[#0A0A0F] animate-pulse" />
            </div>
          )}
        </button>
      </div>

      {/* Floating Chat Modal Panel */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.94 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className={`fixed z-50 glass-card border border-purple-500/35 overflow-hidden flex flex-col shadow-[0_15px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(168,85,247,0.25)] ${
              isExpanded
                ? 'inset-4 sm:inset-10 md:inset-16 w-auto h-auto'
                : 'bottom-24 right-4 sm:right-6 w-[94vw] sm:w-[410px] h-[580px] max-h-[82vh]'
            }`}
          >
            {/* Header Bar */}
            <div className="px-4 py-3.5 bg-gradient-to-r from-purple-900/90 via-[#1A0B2E] to-[#15121F] border-b border-purple-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-400 p-[1px] shadow-[0_0_12px_rgba(168,85,247,0.5)]">
                  <div className="w-full h-full bg-[#110D1D] rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-purple-300" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#110D1D] rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white">Maya</h3>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      AI Companion
                    </span>
                  </div>
                  <p className="text-[11px] text-purple-300/80">Empathetic • Confidential • 24/7</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 text-purple-300">
                <button
                  type="button"
                  onClick={resetChat}
                  title="Reset conversation"
                  className="p-1.5 hover:text-white hover:bg-purple-800/40 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  title={isExpanded ? 'Collapse' : 'Expand window'}
                  className="p-1.5 hover:text-white hover:bg-purple-800/40 rounded-lg transition-colors hidden sm:block"
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsChatOpen(false)}
                  title="Close chat"
                  className="p-1.5 hover:text-white hover:bg-purple-800/40 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Mood Onboarding Bar (if not yet chosen) */}
            {!selectedMood && (
              <div className="px-4 py-2.5 bg-purple-950/40 border-b border-purple-500/20 flex items-center justify-between text-xs">
                <span className="text-purple-200/90 font-medium">Quick Check-in:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleMoodSelect('😔', 'Stressed / Low')}
                    className="p-1.5 rounded-lg hover:bg-purple-800/40 hover:scale-125 transition-transform"
                    title="Stressed or Low"
                  >
                    😔
                  </button>
                  <button
                    onClick={() => handleMoodSelect('😐', 'Neutral / Busy')}
                    className="p-1.5 rounded-lg hover:bg-purple-800/40 hover:scale-125 transition-transform"
                    title="Neutral"
                  >
                    😐
                  </button>
                  <button
                    onClick={() => handleMoodSelect('🙂', 'Calm / Good')}
                    className="p-1.5 rounded-lg hover:bg-purple-800/40 hover:scale-125 transition-transform"
                    title="Calm"
                  >
                    🙂
                  </button>
                  <button
                    onClick={() => handleMoodSelect('😊', 'Energized')}
                    className="p-1.5 rounded-lg hover:bg-purple-800/40 hover:scale-125 transition-transform"
                    title="Energized"
                  >
                    😊
                  </button>
                </div>
              </div>
            )}

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#110D1D]/90 to-[#0A0A0F]/95">
              {chatMessages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-end gap-2 max-w-[85%]">
                      {!isUser && (
                        <div className="w-6 h-6 rounded-full bg-purple-900/60 border border-purple-500/30 flex items-center justify-center shrink-0 mb-1 text-purple-300">
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                      )}

                      <div
                        className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          isUser
                            ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] rounded-br-none'
                            : 'bg-[#181326] text-[#F5F3FF] border-l-2 border-l-purple-400 border-t border-r border-b border-purple-500/15 shadow-[0_4px_20px_rgba(0,0,0,0.25)] rounded-bl-none whitespace-pre-line'
                        }`}
                      >
                        {msg.text}
                      </div>

                      {isUser && (
                        <div className="w-6 h-6 rounded-full bg-fuchsia-900/60 border border-fuchsia-500/30 flex items-center justify-center shrink-0 mb-1 text-fuchsia-300">
                          <User className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <span className="text-[10px] text-purple-400/50 mt-1 px-1">
                      {msg.timestamp}
                    </span>

                    {/* Quick Reply Chips attached to bot message */}
                    {!isUser && msg.quickReplies && msg.quickReplies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2 pl-8">
                        {msg.quickReplies.map((reply) => (
                          <button
                            key={reply}
                            type="button"
                            onClick={() => sendChatMessage(reply)}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-purple-950/60 text-purple-200 border border-purple-500/30 hover:border-purple-300 hover:bg-purple-900/40 hover:text-white transition-all shadow-[0_0_10px_rgba(168,85,247,0.1)] active:scale-95"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Bot Typing Indicator */}
              {isBotTyping && (
                <div className="flex items-center gap-2 pl-2">
                  <div className="w-6 h-6 rounded-full bg-purple-900/60 border border-purple-500/30 flex items-center justify-center text-purple-300">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-[#181326] border border-purple-500/20 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Bar */}
            <form
              onSubmit={handleSubmit}
              className="p-3 bg-[#110D1D] border-t border-purple-500/25 flex items-center gap-2"
            >
              <button
                type="button"
                onClick={toggleVoiceInput}
                className={`p-2.5 rounded-xl border transition-all ${
                  isListening
                    ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse'
                    : 'bg-purple-950/40 border-purple-500/25 text-purple-300 hover:text-white hover:border-purple-400'
                }`}
                title={isListening ? 'Listening...' : 'Voice Input (simulate)'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isListening ? 'Listening to speech...' : 'Type a thought, mood, or question...'}
                className="flex-1 bg-[#1A1429] border border-purple-500/25 rounded-xl px-4 py-2.5 text-sm text-white placeholder-purple-300/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
              />

              <button
                type="submit"
                disabled={!inputText.trim() && !isListening}
                className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all active:scale-95"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
