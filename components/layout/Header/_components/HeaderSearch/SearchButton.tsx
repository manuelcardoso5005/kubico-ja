'use client';

import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchButton({ activeField }: any) {
  return (
    <div className="flex items-center pl-1 pr-2 shrink-0">
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium"
      >
        <Search size={15} strokeWidth={2.5} />

        <AnimatePresence>
          {activeField && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden whitespace-nowrap"
            >
              Pesquisar
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}