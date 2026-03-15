'use client';

import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { Menu, User } from 'lucide-react';

export default function HeaderMenu() {
  return (
    <Link href="/profile">
      <motion.div
        whileHover={{ boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15 }}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 cursor-pointer transition-colors hover:border-neutral-300 dark:hover:border-neutral-600"
      >
        <Menu
          size={15}
          strokeWidth={1.8}
          className="text-neutral-600 dark:text-neutral-400"
        />
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-800">
          <User
            size={13}
            strokeWidth={1.8}
            className="text-neutral-600 dark:text-neutral-400"
          />
        </div>
      </motion.div>
    </Link>
  );
}