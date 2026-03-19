'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { X } from 'lucide-react';

interface OverlayProps {
  clickOutside: () => void;
  children: ReactNode;
}

export default function Overlay({ clickOutside, children }: OverlayProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4
                 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={clickOutside} 
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm overflow-hidden bg-white border shadow-2xl dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 rounded-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}