import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  MessageCircle,
  Activity,
  ShieldCheck,
  Compass,
  Users,
  CreditCard,
  HelpCircle,
  Search,
  Mail,
  ArrowRight,
  Flame,
  CheckCircle2,
  ExternalLink,
  HeartHandshake
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FAQ_CATEGORIES, FAQ_ITEMS } from '../data/faqData';
import { FAQCategory, FAQItem } from '../types';
import { AccordionItem } from '../components/AccordionItem';
import { EmergencyBanner } from '../components/EmergencyBanner';
import { GlowButton } from '../components/GlowButton';
import { BookingModal } from '../components/BookingModal';

export const HomePage: React.FC = () => {
  const { toggleChat, handleMoodSelect } = useApp();
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('getting-started');
  const [expandedFaqId, setExpandedFaqId] = useState<string>('gs-1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Filter FAQs based on search and category
  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (searchQuery.trim() !== '') {
      return matchesSearch;
    }

    return item.category === activeCategory;
  });

  const handleToggleAccordion = (id: string) => {
    setExpandedFaqId(prev => (prev === id ? '' : id));
  };

  const getCategoryCount = (catId: FAQCategory) => {
    return FAQ_ITEMS.filter(item => item.category === catId).length;
  };

  return (
    <div className="min-h-screen">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Ambient Radial Gradient Backdrops */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-purple-600/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-fuchsia-600/10 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-200 text-xs font-semibold shadow-[0_0_15px_rgba(168,85,247,0.2)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>AI-Powered Mental Health & Somatic Yoga Sanctuary</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
            >
              Mental wellness support that fits in your{' '}
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-200 bg-clip-text text-transparent underline decoration-purple-500/40 decoration-wavy decoration-2">
                pocket
              </span>.
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#A1A1B5] leading-relaxed font-normal max-w-2xl mx-auto"
            >
              Accessible, immediate, human-centered care. Converse 24/7 with our empathetic AI, ground your body with tailored somatic yoga postures, or book 1-on-1 sessions with licensed clinical doctors.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="pt-2 flex flex-wrap items-center justify-center gap-4"
            >
              <GlowButton
                variant="primary"
                size="lg"
                onClick={toggleChat}
                icon={<MessageCircle className="w-5 h-5" />}
              >
                Start Chatting with Maya
              </GlowButton>

              <Link to="/yoga">
                <GlowButton
                  variant="outline"
                  size="lg"
                  icon={<Activity className="w-5 h-5 text-purple-400" />}
                >
                  Explore Yoga Sanctuary
                </GlowButton>
              </Link>
            </motion.div>

            {/* Quick Hero Check-in Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-6"
            >
              <div className="glass-card max-w-lg mx-auto p-4 border border-purple-500/25 bg-[#140F22]/80">
                <p className="text-xs font-semibold text-purple-200 mb-2.5">
                  How are you feeling right now? Tap an emotion to chat immediately:
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { emoji: '😔', label: 'Overwhelmed', action: () => { handleMoodSelect('😔', 'Overwhelmed'); toggleChat(); } },
                    { emoji: '😐', label: 'Restless', action: () => { handleMoodSelect('😐', 'Restless'); toggleChat(); } },
                    { emoji: '🙂', label: 'Calm', action: () => { handleMoodSelect('🙂', 'Calm'); toggleChat(); } },
                    { emoji: '😊', label: 'Energized', action: () => { handleMoodSelect('😊', 'Energized'); toggleChat(); } },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={item.action}
                      className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20 hover:border-purple-400/60 hover:bg-purple-900/40 transition-all flex flex-col items-center gap-1 group"
                    >
                      <span className="text-2xl group-hover:scale-125 transition-transform">{item.emoji}</span>
                      <span className="text-[11px] font-medium text-purple-300/80 group-hover:text-white">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* WhatsApp Inspiration Banner Pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-4 flex items-center justify-center gap-2 text-xs text-purple-300/80"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available right inside WhatsApp with end-to-end encryption.</span>
              <a
                href="https://web.whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 font-semibold hover:underline inline-flex items-center gap-0.5"
              >
                Connect on WhatsApp <ExternalLink className="w-3 h-3" />
              </a>
            </motion.div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 2. FREQUENTLY ASKED QUESTIONS SECTION (Matching Reference Structure) */}
      {/* ========================================================================= */}
      <section id="faqs" className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
              Good to Know
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-heading font-normal text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-[#A1A1B5] max-w-xl mx-auto">
              Everything you need to know about our AI companion, clinical care team, transparent pricing, and privacy safeguards.
            </p>

            {/* Search Input Bar */}
            <div className="pt-4 max-w-md mx-auto">
              <div className="relative">
                <Search className="w-4 h-4 text-purple-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions (e.g., 'cost', 'credentials', 'app')..."
                  className="w-full bg-[#15121F]/90 border border-purple-500/30 rounded-full pl-11 pr-4 py-2.5 text-sm text-white placeholder-purple-300/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-purple-300 hover:text-white absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Category Tabs Pill Bar */}
          {searchQuery.trim() === '' && (
            <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
              {FAQ_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                const count = getCategoryCount(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      // Expand first item of chosen category
                      const firstItem = FAQ_ITEMS.find(i => i.category === cat.id);
                      if (firstItem) setExpandedFaqId(firstItem.id);
                    }}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-400/50'
                        : 'bg-[#15121F] text-purple-200/80 border border-purple-500/20 hover:border-purple-500/40 hover:text-white hover:bg-purple-950/40'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-black/30 text-white' : 'bg-purple-900/40 text-purple-300'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Category Heading in list */}
          {searchQuery.trim() === '' && (
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-purple-900/30">
              <div className="w-8 h-8 rounded-full bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-purple-300">
                {activeCategory === 'getting-started' && <Compass className="w-4 h-4" />}
                {activeCategory === 'care-team' && <Users className="w-4 h-4" />}
                {activeCategory === 'pricing-booking' && <CreditCard className="w-4 h-4" />}
                {activeCategory === 'privacy-safety' && <ShieldCheck className="w-4 h-4" />}
                {activeCategory === 'general' && <HelpCircle className="w-4 h-4" />}
              </div>
              <h3 className="text-xl font-bold text-white capitalize">
                {activeCategory.replace('-', ' ')}
              </h3>
            </div>
          )}

          {/* Accordion FAQ Items List */}
          <div className="space-y-3.5 mb-12">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  item={faq}
                  isOpen={expandedFaqId === faq.id}
                  onToggle={() => handleToggleAccordion(faq.id)}
                />
              ))
            ) : (
              <div className="glass-card p-8 text-center space-y-3 border-purple-500/20">
                <p className="text-purple-300">No questions matched "{searchQuery}".</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-purple-400 hover:text-white underline"
                >
                  View all questions
                </button>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* 3. EMERGENCY CRISIS ALERT BANNER */}
          {/* ========================================================================= */}
          <EmergencyBanner />

          {/* ========================================================================= */}
          {/* 4. "STILL HAVE QUESTIONS?" CTA BLOCK */}
          {/* ========================================================================= */}
          <div className="glass-card p-8 sm:p-10 border border-purple-500/30 text-center max-w-2xl mx-auto my-12 bg-gradient-to-b from-[#161224] to-[#100D1B]">
            <h3 className="text-2xl sm:text-3xl font-serif-heading font-normal text-white mb-2">
              Still have questions?
            </h3>
            <p className="text-sm text-[#A1A1B5] leading-relaxed mb-6 max-w-md mx-auto">
              Can’t find the answer you’re looking for? Reach out right now. Our AI companion Maya is ready 24/7, and our clinical care team is just an email away.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <GlowButton
                variant="primary"
                size="md"
                onClick={toggleChat}
                icon={<MessageCircle className="w-4 h-4" />}
              >
                Chat with Maya Now
              </GlowButton>

              <a href="mailto:support@mindwell.care">
                <GlowButton
                  variant="outline"
                  size="md"
                  icon={<Mail className="w-4 h-4 text-purple-400" />}
                >
                  Email Us Instead
                </GlowButton>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
};
