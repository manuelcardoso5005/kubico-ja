'use client';

import { DollarSign, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useId, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type QuickPrice = { label: string; max: number };
type PriceRange = { min: number; max: number };
type PriceSelection =
  | { kind: 'quick'; option: QuickPrice }
  | { kind: 'range'; range: PriceRange }
  | null;

type Props = {
  active: boolean;
  onClick: () => void;
  onHoverChange?: (hover: boolean) => void;
  onChange?: (selection: PriceSelection) => void;
  onClose?: () => void;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const QUICK_OPTIONS: QuickPrice[] = [
  { label: 'Até 5 000 Kz',    max: 5_000  },
  { label: '5 000–15 000 Kz', max: 15_000 },
  { label: '15 000 Kz+',      max: 999_999 },
];

const MIN = 0;
const MAX = 50_000;
const STEP = 500;

const fmt = (n: number) =>
  n >= 999_999
    ? 'Sem limite'
    : n.toLocaleString('pt-AO') + ' Kz';

// ─── Component ────────────────────────────────────────────────────────────────

export default function PriceField({ active, onClick, onHoverChange, onChange, onClose }: Props) {
  const id  = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [tab, setTab]             = useState<'quick' | 'range'>('quick');
  const [selection, setSelection] = useState<PriceSelection>(null);
  const [range, setRange]         = useState<PriceRange>({ min: 0, max: 20_000 });

  // ── Close on outside click / Escape ──────────────────────────────────────
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

  // ── Handlers ─────────────────────────────────────────────────────────────
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

  // ── Derived label ─────────────────────────────────────────────────────────
  const label = (() => {
    if (!selection) return null;
    if (selection.kind === 'quick') return selection.option.label;
    return `${fmt(selection.range.min)} – ${fmt(selection.range.max)}`;
  })();

  // ── Range helpers ─────────────────────────────────────────────────────────
  const minPct = ((range.min - MIN) / (MAX - MIN)) * 100;
  const maxPct = ((range.max - MIN) / (MAX - MIN)) * 100;

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
            <DollarSign className="size-4 md:size-3" strokeWidth={2.5} />
             <span className="text-[10px] md:text-xs font-bold md:font-semibold uppercase md:normal-case">
              {label ? 'Preco'  : 'Preco'}
            </span>
          </span>
          <span className={`hidden text-xs truncate md:block text-neutral-400 ${
            label ? 'text-neutral-800 dark:text-neutral-200 font-medium' : 'text-neutral-400'
          }`}>
            {label ?? 'Qualquer preço'}
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
            <div role="tablist" className="flex border-b border-neutral-100 dark:border-neutral-800">
              {(['quick', 'range'] as const).map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-2.5 text-xs font-semibold transition-colors
                    ${tab === t
                      ? 'text-neutral-900 dark:text-white border-b-2 border-neutral-900 dark:border-white -mb-px'
                      : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'}`}
                >
                  {t === 'quick' ? 'Rápido' : 'Intervalo'}
                </button>
              ))}
            </div>

            {/* Quick tab */}
            {tab === 'quick' && (
              <ul className="p-1.5 flex flex-col gap-0.5">
                {QUICK_OPTIONS.map((opt) => {
                  const selected = selection?.kind === 'quick' && selection.option.label === opt.label;
                  return (
                    <li key={opt.label}>
                      <button
                        onClick={() => selectQuick(opt)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-colors
                          ${selected
                            ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium'
                            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
                      >
                        <span>{opt.label}</span>
                        {selected && (
                          <span className="text-[10px] text-neutral-400 dark:text-neutral-600">✓</span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Range tab */}
            {tab === 'range' && (
              <div className="flex flex-col gap-4 p-4">

                {/* Price display */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">Mínimo</span>
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">{fmt(range.min)}</span>
                  </div>
                  <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700" />
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">Máximo</span>
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">{fmt(range.max)}</span>
                  </div>
                </div>

                {/* Dual range track */}
                <div className="relative flex items-center h-5">
                  {/* Track base */}
                  <div className="absolute inset-x-0 h-1 rounded-full bg-neutral-200 dark:bg-neutral-700" />

                  {/* Active segment */}
                  <div
                    className="absolute h-1 rounded-full bg-neutral-900 dark:bg-white"
                    style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
                  />

                  {/* Min thumb */}
                  <input
                    type="range"
                    min={MIN} max={MAX} step={STEP}
                    value={range.min}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (v < range.max) setRange((r) => ({ ...r, min: v }));
                    }}
                    className="absolute inset-0 w-full h-5 opacity-0 cursor-pointer"
                    style={{ zIndex: range.min > MAX - STEP * 5 ? 5 : 3 }}
                    aria-label="Preço mínimo"
                  />

                  {/* Max thumb */}
                  <input
                    type="range"
                    min={MIN} max={MAX} step={STEP}
                    value={range.max}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (v > range.min) setRange((r) => ({ ...r, max: v }));
                    }}
                    className="absolute inset-0 w-full h-5 opacity-0 cursor-pointer"
                    style={{ zIndex: 4 }}
                    aria-label="Preço máximo"
                  />

                  {/* Visual thumbs */}
                  <div
                    className="absolute w-4 h-4 bg-white border-2 rounded-full shadow pointer-events-none dark:bg-neutral-900 border-neutral-900 dark:border-white"
                    style={{ left: `calc(${minPct}% - 8px)` }}
                  />
                  <div
                    className="absolute w-4 h-4 bg-white border-2 rounded-full shadow pointer-events-none dark:bg-neutral-900 border-neutral-900 dark:border-white"
                    style={{ left: `calc(${maxPct}% - 8px)` }}
                  />
                </div>

                {/* Confirm */}
                <button
                  onClick={confirmRange}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold
                    bg-neutral-900 dark:bg-white text-white dark:text-neutral-900
                    hover:bg-neutral-700 dark:hover:bg-neutral-200
                    transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                >
                  Confirmar
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}