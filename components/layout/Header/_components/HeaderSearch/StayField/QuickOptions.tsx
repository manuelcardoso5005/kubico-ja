'use client';
import { QuickOption, Selection } from '@/types/header';
import { useTranslations } from 'next-intl';

type Props = {
  options: QuickOption[];
  selection: Selection;
  onSelect: (option: QuickOption) => void;
};

export default function QuickOptions({ options, selection, onSelect }: Props) {
  const t = useTranslations('header');

  return (
    <ul role="listbox" aria-label="Opções rápidas" className="p-1.5 flex flex-col gap-0.5">
      {options.map((opt) => {
        const selected = selection?.kind === 'quick' && selection.option.label === opt.label;
        return (
          <li key={opt.label} role="option" aria-selected={selected}>
            <button
              onClick={() => onSelect(opt)}
              className={`
                w-full flex items-center justify-between
                px-3.5 py-2.5 rounded-xl text-sm transition-colors
                ${selected
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'}
              `}
            >
              {/* Mostra a tradução do key */}
              <span>{t(opt.key)}</span>

              <span className={`text-xs tabular-nums ${
                selected ? 'text-neutral-300 dark:text-neutral-600' : 'text-neutral-400'
              }`}>
                {opt.days}d
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}