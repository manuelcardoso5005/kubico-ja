'use client';
import { useTranslations } from 'next-intl';
import { DateRange } from '@/types/header';

type Props = {
  draft: DateRange;
  setDraft: (range: DateRange) => void;
  onConfirm: () => void;
};

const today = () => new Date().toISOString().split('T')[0];
const addDays = (date: string, n: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
};

export default function CustomDates({ draft, setDraft, onConfirm }: Props) {
  const t = useTranslations('header');
  const from = draft.from;
  const to = draft.to;

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">{t('filter.check_in')}</label>
          <input
            type="date"
            min={today()}
            value={from}
            onChange={(e) => {
              const f = e.target.value;
              setDraft({ from: f, to: to < f ? addDays(f, 1) : to });
            }}
            className="w-full px-3 py-2 text-sm transition-colors bg-white border rounded-xl border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">{t('filter.check_out')}</label>
          <input
            type="date"
            min={from ? addDays(from, 1) : today()}
            value={to}
            onChange={(e) => setDraft({ ...draft, to: e.target.value })}
            className="w-full px-3 py-2 text-sm transition-colors bg-white border rounded-xl border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
          />
        </div>
      </div>

      <button
        onClick={onConfirm}
        disabled={!from || !to || from > to}
        className="w-full py-2.5 rounded-xl text-sm font-semibold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
      >
        {t('filter.confirm')}
      </button>
    </div>
  );
}