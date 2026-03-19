'use client';

import { motion } from 'framer-motion';
import { LogIn, UserPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AuthPanel() {
    const t = useTranslations('header');
  return (
    <div className="flex items-center gap-2">
      <motion.button
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors rounded-full
          text-neutral-700 dark:text-neutral-300
          hover:bg-neutral-100 dark:hover:bg-neutral-800"
      >
        <LogIn size={14} strokeWidth={2} />
        <span className="hidden md:inline">
          {t('auth.login')}
        </span>
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-colors
          bg-neutral-900 dark:bg-white
          text-white dark:text-neutral-900
          hover:bg-neutral-700 dark:hover:bg-neutral-200"
      >
        <UserPlus size={14} strokeWidth={2} />
        <span className="hidden md:inline">
          {t('auth.register')}
        </span>
      </motion.button>
    </div>
  );
}