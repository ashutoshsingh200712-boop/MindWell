import React from 'react';
import { AlertTriangle, PhoneCall, MessageSquare, ShieldAlert } from 'lucide-react';

export const EmergencyBanner: React.FC = () => {
  return (
    <section id="crisis-banner" className="w-full my-8 scroll-mt-24">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1E140C] via-[#1A1108] to-[#170E08] border border-amber-500/35 p-6 sm:p-7 shadow-[0_0_30px_rgba(245,158,11,0.18)]">
        
        {/* Amber Ambient Glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          
          {/* Icon & Message */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-semibold text-amber-200">
                  Immediate Crisis & Emergency Support
                </h3>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  24/7 Free & Confidential
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-100/75 leading-relaxed">
                <strong className="text-amber-200">MindWell is not an emergency crisis intervention service.</strong> If you or someone you know is undergoing acute distress, experiencing thoughts of self-harm, or facing a medical crisis, please reach out directly to licensed emergency services right now. You are never alone.
              </p>
            </div>
          </div>

          {/* Quick Helpline Badges & CTAs */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href="tel:988"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-sm shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:bg-amber-400 transition-all active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              Call 988 Lifeline
            </a>

            <a
              href="sms:741741?body=HOME"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-200 font-semibold text-sm hover:bg-amber-900/60 transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              Text HOME to 741741
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
