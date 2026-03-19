'use client';

import { useLocale } from 'next-intl';
import { routing, usePathname, useRouter } from '@/i18n/routing';
import { useRef, useState, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LOCALE_META: Record<string, { flag: string; label: string }> = {
  pt: { flag: '🇦🇴', label: 'PT' },
  en: { flag: '🇬🇧', label: 'EN' },
  zh: { flag: '🇨🇳', label: 'ZH' },
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const select = (loc: string) => {
    router.replace(pathname, { locale: loc as any });
    setOpen(false);
  };

  const current = LOCALE_META[locale] ?? { flag: '🌐', label: locale.toUpperCase() };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={13} strokeWidth={2} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-1.5 w-32 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg overflow-hidden z-50 list-none p-1"
          >
            {routing.locales.map((loc) => {
              const meta = LOCALE_META[loc] ?? { flag: '🌐', label: loc.toUpperCase() };
              const isActive = loc === locale;
              return (
                <li key={loc}>
                  <button
                    onClick={() => select(loc)}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer
                      ${isActive
                        ? 'text-neutral-900 dark:text-white font-semibold bg-neutral-100 dark:bg-neutral-800'
                        : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{meta.flag}</span>
                      <span>{meta.label}</span>
                    </span>
                    {isActive && <Check size={12} strokeWidth={2.5} />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}