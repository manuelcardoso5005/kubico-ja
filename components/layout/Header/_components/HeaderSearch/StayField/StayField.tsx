'use client';
import { useRef, useEffect, useId, useState } from 'react';
import { Calendar, Clock, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuickOption, Selection } from '@/types/header';
import QuickOptions from './QuickOptions';
import CustomDates from './CustomDates';

const QUICK_OPTIONS: QuickOption[] = [
  { label: 'Fim de semana', days: 2 },
  { label: '1 semana', days: 7 },
  { label: '1 mês', days: 30 },
];

const today = () => new Date().toISOString().split('T')[0];
const addDays = (date: string, n: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
};

type Props = {
  active: boolean;
  onClick: () => void;
  onHoverChange?: (hover: boolean) => void;
  onChange?: (selection: Selection) => void;
  onClose?: () => void;
};

export default function StayField({ active, onClick, onHoverChange, onChange, onClose }: Props) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<'quick' | 'custom'>('quick');
  const [selection, setSelection] = useState<Selection>(null);
  const [draft, setDraft] = useState({ from: today(), to: addDays(today(), 7) });

  // Close on outside click or Escape
  useEffect(() => {
    if (!active) return;
    const handle = (e: MouseEvent | KeyboardEvent) => {
      if ('key' in e && e.key === 'Escape') return onClose?.();
      if (ref.current && !(e.target instanceof Node && ref.current.contains(e.target))) onClose?.();
    };
    document.addEventListener('mousedown', handle);
    document.addEventListener('keydown', handle);
    return () => {
      document.removeEventListener('mousedown', handle);
      document.removeEventListener('keydown', handle);
    };
  }, [active, onClose]);

  const selectQuick = (opt: QuickOption) => {
    const next: Selection = { kind: 'quick', option: opt };
    setSelection(next);
    onChange?.(next);
    setTimeout(() => onClose?.(), 150);
  };

  const confirmCustom = () => {
    if (!draft.from || !draft.to || draft.from > draft.to) return;
    const next: Selection = { kind: 'custom', range: draft };
    setSelection(next);
    onChange?.(next);
  };

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelection(null);
    onChange?.(null);
  };

  const label = selection
    ? selection.kind === 'quick'
      ? selection.option.label
      : `${draft.from} – ${draft.to}`
    : null;

  return (
    <div ref={ref} className="relative flex-[1.4]">
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
          <span className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white mb-0.5">
            <Calendar size={12} strokeWidth={2} aria-hidden />
            Estadia
          </span>
          <span className={`text-xs truncate ${label ? 'text-neutral-800 dark:text-neutral-200 font-medium' : 'text-neutral-400'}`}>
            {label ?? 'Adicionar datas'}
          </span>
        </span>

        <span className="flex items-center gap-1 ml-2 shrink-0">
          {label && (
            <span onClick={clear} className="flex items-center justify-center w-4 h-4 rounded-full bg-neutral-300 dark:bg-neutral-600 text-neutral-600 dark:text-neutral-300 text-[10px] leading-none cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-500 transition-colors">
              ×
            </span>
          )}
          <ChevronDown size={12} strokeWidth={2} aria-hidden className={`${active ? 'rotate-180' : ''} text-neutral-400 transition-transform`} />
        </span>
      </button>

      <AnimatePresence>
        {active && (
          <motion.div
            id={`${id}-panel`}
            role="dialog"
            aria-label="Selecionar estadia"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-0 z-50 mt-2 overflow-hidden bg-white border shadow-xl w-72 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 rounded-2xl"
          >
            {/* Tab bar */}
            <div role="tablist" className="flex border-b border-neutral-100 dark:border-neutral-800">
              {(['quick', 'custom'] as const).map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={tab === t}
                  aria-controls={`${id}-tab-${t}`}
                  id={`${id}-tab-btn-${t}`}
                  onClick={() => setTab(t)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold transition-colors
                    ${tab === t ? 'text-neutral-900 dark:text-white border-b-2 border-neutral-900 dark:border-white -mb-px' : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'}
                  `}
                >
                  {t === 'quick' ? <Clock size={11} aria-hidden /> : <Calendar size={11} aria-hidden />}
                  {t === 'quick' ? 'Rápido' : 'Datas'}
                </button>
              ))}
            </div>

            {tab === 'quick' && <QuickOptions options={QUICK_OPTIONS} selection={selection} onSelect={selectQuick} />}
            {tab === 'custom' && <CustomDates draft={draft} setDraft={setDraft} onConfirm={confirmCustom} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}