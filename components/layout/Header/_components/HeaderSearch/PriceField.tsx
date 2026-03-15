'use client';

import { DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  active: boolean
  onClick: () => void
  onHoverChange?: (hover: boolean) => void
}

export default function PriceField({ active, onClick, onHoverChange }: Props) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      className={`flex flex-col justify-center px-5 py-3 text-left flex-1 rounded-full transition-colors
      ${
        active
          ? 'bg-neutral-50 dark:bg-neutral-800'
          : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
      }`}
    >
      <span className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white mb-0.5">
        <DollarSign size={12} strokeWidth={2} />
        Preço
      </span>

      <span className="text-xs truncate text-neutral-400">
        {active ? 'Até $50 · $50–200 · $200+' : 'Qualquer preço'}
      </span>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex gap-1.5 mt-2"
          >
            {['Até $50', '$50–200', '$200+'].map((opt) => (
              <button
                key={opt}
                onClick={(e) => e.stopPropagation()}
                className="px-2.5 py-1 rounded-full text-xs border border-neutral-200 dark:border-neutral-700"
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}