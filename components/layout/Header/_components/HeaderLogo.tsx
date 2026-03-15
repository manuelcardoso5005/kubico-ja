'use client';

import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';

export default function HeaderLogo() {
  return (
    <Link href="/" className="group flex items-center gap-0.5">
      <motion.span
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="text-lg font-bold tracking-tighter text-black select-none dark:text-white"
      >
        kubico
        <span className="transition-colors duration-200 text-rose-500 group-hover:text-rose-400">
          ja
        </span>
      </motion.span>
    </Link>
  );
}