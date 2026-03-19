// components/AuthButton.tsx
'use client';

import { motion } from 'framer-motion';
import { LogIn, UserPlus } from 'lucide-react';
import { ReactNode } from 'react';

type AuthButtonProps = {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  variant?: 'login' | 'register';
};

export default function AuthButton({ label, icon, onClick, variant = 'login' }: AuthButtonProps) {
  const baseClasses =
    'flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-colors';

  const variants = {
    login: 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800',
    register:
      'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-200',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </motion.button>
  );
}