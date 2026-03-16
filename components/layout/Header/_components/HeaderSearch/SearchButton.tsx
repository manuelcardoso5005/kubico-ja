'use client';

import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function SearchButton({ activeField }: any) {
  const t = useTranslations('header');
  return (
    <div className="items-center hidden pl-1 pr-2 md:flex shrink-0">
      <Link href="/search">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-2.5 py-2.5 md:px-4 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium"
        >
          <Search size={15} strokeWidth={2.5} />

          <AnimatePresence>
            {activeField && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="hidden overflow-hidden md:block whitespace-nowrap"
              >
                {t('filter.search')}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </Link>
    </div>
  );
}