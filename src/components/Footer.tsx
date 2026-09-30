import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ShieldCheck, Award, Lock, ExternalLink, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { toggleChat } = useApp();

  return (
    <footer className="w-full bg-gradient-to-b from-[#0D0B14] via-[#09080F] to-[#050408] border-t border-purple-500/20 text-[#A1A1B5] pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-purple-900/30">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-700 to-fuchsia-500 p-[1px] shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <div className="w-full h-full bg-[#0E0B18] rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-300" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">MindWell</span>
            </Link>
            <p className="text-sm text-[#A1A1B5] leading-relaxed max-w-sm">
              Mental wellness support that fits in your pocket. Accessible, immediate, human-centered care combining compassionate conversational AI, somatic yoga grounding, and board-certified clinicians.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                24/7 AI Companion Online
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/30">
                HIPAA & SOC-2
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-200">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-purple-300 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/yoga" className="hover:text-purple-300 transition-colors flex items-center gap-1">
                  Yoga Sanctuary
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-600/30 text-purple-300 font-semibold">New</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-purple-300 transition-colors">Wellness Dashboard</Link>
              </li>
              <li>
                <Link to="/chat" className="hover:text-purple-300 transition-colors">Maya AI Chatbot</Link>
              </li>
              <li>
                <a href="#faqs" className="hover:text-purple-300 transition-colors">Frequently Asked Questions</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-200">Clinical Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-white font-medium">Psychiatric Consultations</span>
                <p className="text-xs text-purple-400/80">Evaluation & Prescriptions</p>
              </li>
              <li>
                <span className="text-white font-medium">CBT & Psychotherapy</span>
                <p className="text-xs text-purple-400/80">Licensed 1-on-1 Sessions</p>
              </li>
              <li>
                <span className="text-white font-medium">Somatic Yoga & Breath</span>
                <p className="text-xs text-purple-400/80">Vagus nerve regulation</p>
              </li>
              <li>
                <span className="text-white font-medium">Student Wellness Concession</span>
                <p className="text-xs text-purple-400/80">30% off with .edu verification</p>
              </li>
            </ul>
          </div>

          {/* Legal & Safety */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-200">Legal & Trust</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#faqs" className="hover:text-purple-300 transition-colors">Privacy & Data Charter</a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-purple-300 transition-colors">HIPAA Compliance</a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-purple-300 transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-purple-300 transition-colors">Clinical Code of Ethics</a>
              </li>
              <li>
                <a href="#crisis-banner" className="hover:text-amber-300 transition-colors text-amber-400/90 font-medium">Crisis Safety Protocols</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Partner & Certification Trust Logos Row */}
        <div className="py-8 border-b border-purple-900/30">
          <div className="flex flex-wrap items-center justify-between gap-6 text-xs text-purple-300/70">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>HIPAA Compliant Cloud</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-400" />
              <span>IAYT Yoga Therapy Accredited</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-400" />
              <span>256-Bit Encrypted Data at Rest</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Evidence-Based Somatic Science</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Socials */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-purple-300/60">
          <p>© {new Date().getFullYear()} MindWell Technologies, Inc. All rights reserved. Human-centered mental health companion.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleChat}
              className="text-purple-300 hover:text-white transition-colors"
            >
              Chat on Web
            </button>
            <span>•</span>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noreferrer"
              className="text-purple-300 hover:text-white transition-colors flex items-center gap-1"
            >
              Connect on WhatsApp <ArrowUpRight className="w-3 h-3" />
            </a>
            <span>•</span>
            <a href="mailto:support@mindwell.care" className="text-purple-300 hover:text-white transition-colors">
              support@mindwell.care
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
