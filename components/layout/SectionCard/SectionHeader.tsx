'use client';

import { Link } from "@/i18n/routing";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  href: string;
  isMobile: boolean;
  showLeftArrow: boolean;
  showRightArrow: boolean;
  isScrolling: boolean;
  scroll: (direction: 'left' | 'right') => void;
}

export default function SectionHeader({
  title,
  href,
  isMobile,
  showLeftArrow,
  showRightArrow,
  isScrolling,
  scroll
}: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        {/* Título com seta à esquerda */}
        <Link 
          href={href}
          className="flex items-center gap-2 group"
        >
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            {title}
          </h2>
          <ArrowRight 
            size={20} 
            className="transition-transform text-neutral-900 dark:text-white group-hover:translate-x-1" 
          />
        </Link>

        {/* Botões de navegação à direita - apenas desktop */}
        {!isMobile && (
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {showLeftArrow && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => scroll('left')}
                  disabled={isScrolling}
                  className="flex items-center justify-center w-8 h-8 transition-all bg-white border rounded-full shadow-md dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <ChevronLeft size={16} className="text-neutral-900 dark:text-white" />
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showRightArrow && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => scroll('right')}
                  disabled={isScrolling}
                  className="flex items-center justify-center w-8 h-8 transition-all bg-white border rounded-full shadow-md dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <ChevronRight size={16} className="text-neutral-900 dark:text-white" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}