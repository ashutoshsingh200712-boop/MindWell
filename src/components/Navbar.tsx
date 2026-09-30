import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, MessageCircle, Menu, X, Flame, Heart, Activity } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GlowButton } from './GlowButton';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { toggleChat, user } = useApp();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Yoga Sanctuary', path: '/yoga' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Care Team & FAQs', path: '/#faqs' },
    { name: 'AI Companion', path: '/chat' },
  ];

  const isActive = (path: string) => {
    if (path === '/#faqs') return location.hash === '#faqs';
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-lg">
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-700 via-purple-500 to-fuchsia-400 p-[1px] shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_28px_rgba(192,132,252,0.7)] transition-all duration-300">
            <div className="w-full h-full bg-[#0E0B18] rounded-2xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-300 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-purple-200 transition-colors">
                MindWell
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                AI + Somatic
              </span>
            </div>
            <p className="text-[11px] text-purple-300/60 hidden sm:block tracking-wide">
              Mental Wellness & Yoga
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#15121F]/80 border border-purple-500/20 px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.08)]">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                  active
                    ? 'text-white bg-purple-600/30 shadow-[0_0_15px_rgba(168,85,247,0.3)] border border-purple-400/40'
                    : 'text-[#A1A1B5] hover:text-white hover:bg-purple-900/20'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* User Streak Pill */}
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 hover:border-purple-400 transition-colors group"
            title="Current Wellness Streak"
          >
            <Flame className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-white">{user.streakDays}d</span>
            <span className="text-[11px] text-purple-300/70">Streak</span>
          </Link>

          {/* Quick Chat Open */}
          <GlowButton
            variant="primary"
            size="sm"
            onClick={toggleChat}
            icon={<MessageCircle className="w-4 h-4" />}
          >
            Chat with Maya
          </GlowButton>

          {/* Profile Avatar */}
          <Link
            to="/dashboard"
            className="relative rounded-full ring-2 ring-purple-500/40 hover:ring-purple-400 transition-all p-0.5"
            title="Open Dashboard"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0A0A0F] rounded-full"></span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleChat}
            className="p-2 rounded-xl bg-purple-950/50 border border-purple-500/30 text-purple-300 hover:text-white"
            aria-label="Open AI Chat"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-purple-950/50 border border-purple-500/30 text-purple-200 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card mx-3 mb-3 p-4 border border-purple-500/30 rounded-2xl space-y-3 bg-[#110D1D]/95">
          <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
            <div className="flex items-center gap-2">
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
              <div>
                <p className="text-xs font-semibold text-white">{user.name}</p>
                <p className="text-[10px] text-purple-300">Wellness Score: {user.wellnessScore}%</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-xs text-amber-400">
              <Flame className="w-3.5 h-3.5" />
              <span>{user.streakDays} Day Streak</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-purple-600/30 text-white border border-purple-400/40'
                    : 'text-[#A1A1B5] hover:text-white hover:bg-purple-900/20'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <GlowButton
              variant="primary"
              size="md"
              className="w-full justify-center"
              onClick={() => {
                setMobileMenuOpen(false);
                toggleChat();
              }}
              icon={<MessageCircle className="w-4 h-4" />}
            >
              Start Chat with Maya
            </GlowButton>
          </div>
        </div>
      )}
    </header>
  );
};
