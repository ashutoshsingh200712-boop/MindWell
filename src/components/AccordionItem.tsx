import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Clock, Tag } from 'lucide-react';
import { FAQItem } from '../types';

interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ item, isOpen, onToggle }) => {
  return (
    <div
      className={`rounded-2xl transition-all duration-300 ${
        isOpen
          ? 'bg-[#181326] border border-purple-500/50 shadow-[0_0_25px_rgba(168,85,247,0.22)]'
          : 'bg-[#13101E]/80 border border-purple-500/15 hover:border-purple-500/35 hover:bg-[#161224]'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left px-5 sm:px-6 py-4.5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-2xl group"
      >
        <span className={`text-base sm:text-lg font-medium transition-colors ${
          isOpen ? 'text-white' : 'text-purple-100 group-hover:text-white'
        }`}>
          {item.question}
        </span>
        
        <div
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.6)] rotate-180'
              : 'bg-purple-950/60 border border-purple-500/30 text-purple-300 group-hover:border-purple-400 group-hover:text-white'
          }`}
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 pt-1 text-sm text-[#A1A1B5] leading-relaxed border-t border-purple-900/40 space-y-3">
              <p className="pt-2">{item.answer}</p>

              {/* Tags & Read time */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                {item.readTime && (
                  <span className="flex items-center gap-1 text-purple-400/80 bg-purple-950/50 px-2 py-0.5 rounded-md border border-purple-500/20">
                    <Clock className="w-3 h-3" />
                    {item.readTime}
                  </span>
                )}
                {item.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-purple-300/80 bg-purple-900/20 px-2 py-0.5 rounded-md border border-purple-500/20"
                  >
                    <Tag className="w-2.5 h-2.5 text-purple-400" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
