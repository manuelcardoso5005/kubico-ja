'use client';

import { DollarSign, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useId, useState } from 'react';

import { PriceRange, PriceSelection, QuickPrice } from '@/types/header';
import { formatPrice } from './utils';
import QuickTab from './QuickTab';
import RangeTab from './RangeTab';
import { useTranslations } from 'next-intl';

type Props = {
  active: boolean;
  onClick: () => void;
  onHoverChange?: (hover: boolean) => void;
  onChange?: (selection: PriceSelection) => void;
  onClose?: () => void;
};

export default function PriceField({ active, onClick, onHoverChange, onChange, onClose }: Props) {
  const id  = useId();
  const ref = useRef<HTMLDivElement>(null);

  const [tab, setTab]             = useState<'quick' | 'range'>('quick');
  const [selection, setSelection] = useState<PriceSelection>(null);
  const [range, setRange]         = useState<PriceRange>({ min: 0, max: 20_000 });
  const t = useTranslations('header');

  useEffect(() => {
    if (!active) return;
    const handleMouse = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose?.();
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('mousedown', handleMouse);
    document.addEventListener('keydown',   handleKey);
    return () => {
      document.removeEventListener('mousedown', handleMouse);
      document.removeEventListener('keydown',   handleKey);
    };
  }, [active, onClose]);

  const selectQuick = (opt: QuickPrice) => {
    const next: PriceSelection = { kind: 'quick', option: opt };
    setSelection(next);
    onChange?.(next);
    setTimeout(() => onClose?.(), 150);
  };

  const confirmRange = () => {
    const next: PriceSelection = { kind: 'range', range };
    setSelection(next);
    onChange?.(next);
    setTimeout(() => onClose?.(), 150);
  };

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelection(null);
    onChange?.(null);
  };

  const label = (() => {
    if (!selection) return null;
    if (selection.kind === 'quick') return selection.option.label;
    return `${formatPrice(selection.range.min)} – ${formatPrice(selection.range.max)}`;
  })();

  return (
    <div ref={ref} className="relative flex-1">

      {/* ── Trigger ── */}
      <button
        id={`${id}-trigger`}
        aria-haspopup="true"
        aria-expanded={active}
        aria-controls={`${id}-panel`}
        onClick={onClick}
        onMouseEnter={() => onHoverChange?.(true)}
        onMouseLeave={() => onHoverChange?.(false)}
        className={`group w-full flex items-center justify-between px-5 py-3 rounded-full transition-colors text-left
          ${active ? 'bg-neutral-50 dark:bg-neutral-800' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
      >
        <span className="flex flex-col min-w-0">
          <span className="flex flex-col items-center justify-center gap-0.5 md:flex-row md:items-center md:justify-start md:gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white mb-0.5">
            <DollarSign className="size-4 md:size-3" aria-hidden />
            <span className="text-[10px] md:text-xs font-bold md:font-semibold uppercase md:normal-case">{t('filter.price')}</span>
          </span>
          <span className={`hidden md:block text-xs truncate ${
            label ? 'text-neutral-800 dark:text-neutral-200 font-medium' : 'text-neutral-400'
          }`}>
            {label ?? t('filter.any_price')}
          </span>
        </span>

        <span className="flex items-center gap-1 ml-2 shrink-0">
          {label && (
            <span
              onClick={clear}
              className="flex items-center justify-center w-4 h-4 rounded-full
                bg-neutral-500 dark:bg-neutral-400
                text-white dark:text-neutral-900
                text-[11px] font-bold leading-none cursor-pointer
                hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors"
            >
              ×
            </span>
          )}
          <ChevronDown
            size={12} strokeWidth={2} aria-hidden
            className={`text-neutral-400 transition-transform duration-200 ${active ? 'rotate-180' : ''}`}
          />
        </span>
      </button>

      {/* ── Dropdown ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            id={`${id}-panel`}
            role="dialog"
            aria-label="Selecionar preço"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 z-50 mt-2 overflow-hidden bg-white border shadow-xl w-72 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 rounded-2xl"
          >
            {/* Tab bar */}
            <div
              role="tablist"
              className="flex border-b border-neutral-100 dark:border-neutral-800"
            >
              {(['quick', 'range'] as const).map((tabName) => (
                <button
                  key={tabName}
                  role="tab"
                  aria-selected={tab === tabName}
                  onClick={() => setTab(tabName)}
                  className={`flex-1 py-2.5 text-xs font-semibold transition-colors
                    ${
                      tab === tabName
                        ? 'text-neutral-900 dark:text-white border-b-2 border-neutral-900 dark:border-white -mb-px'
                        : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
                    }`}
                >
                  {tabName === 'quick'
                    ? t('filter.quick')
                    : t('filter.range')}
                </button>
              ))}
            </div>

            {tab === 'quick' && (
              <QuickTab selection={selection} onSelect={selectQuick} />
            )}
            {tab === 'range' && (
              <RangeTab range={range} setRange={setRange} onConfirm={confirmRange} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}