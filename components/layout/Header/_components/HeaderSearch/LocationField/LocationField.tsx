'use client';

import { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { provinces } from '@/data/constants';

export default function LocationField({ active, onClick, onHoverChange, onProvinceSelect, onClose }: any) {
  const [province, setProvince] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const t = useTranslations('header');
  
useEffect(() => {
  if (!active) return;

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Node;
    // Se o clique foi fora do dropdown, fecha
    if (ref.current && !ref.current.contains(target)) {
      onClose?.();
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, [active, onClose]);

  const handleSelect = (p: string) => {
    setProvince(p);
    onProvinceSelect?.(p); // envia para o HeaderSearch
    onClose?.(); // fecha dropdown
  };

  return (
    <div ref={ref} className="relative flex-[1.4]">
      <button
        onClick={onClick}
        onMouseEnter={() => onHoverChange?.(true)}
        onMouseLeave={() => onHoverChange?.(false)}
        className={`w-full flex flex-col justify-center px-5 py-3 text-left rounded-full transition-colors
          ${active ? 'bg-neutral-100 dark:bg-neutral-800' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
      >
        <span className="flex flex-col items-center justify-center gap-0.5 md:flex-row md:items-center md:justify-start md:gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white mb-0.5">
          <MapPin className="size-4 md:size-3" strokeWidth={2.5} />
          <span className="text-[10px] md:text-xs font-bold md:font-semibold uppercase md:normal-case">
            {province ? t('filter.location') : t('filter.location')}
          </span>
        </span>
        <span className="hidden text-xs truncate md:block text-neutral-400">
          {province ?? t('filter.where')}
        </span>
      </button>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 z-50 w-64 mt-2 overflow-hidden bg-white border shadow-lg dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 rounded-xl"
          >
            <ul className="overflow-y-auto max-h-72">
              {provinces.map((p) => (
                <li key={p}>
                  <button
                    onClick={() => handleSelect(p)}
                    className="w-full px-4 py-2 text-sm text-left transition-colors text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}