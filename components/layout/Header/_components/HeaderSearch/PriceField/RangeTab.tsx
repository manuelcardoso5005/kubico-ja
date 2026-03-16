import { PriceRange } from "@/types/header";
import { MIN, MAX, STEP } from "@/data/constants";
import { formatPrice } from "./utils";
import { useTranslations } from 'next-intl';

type Props = {
  range: PriceRange;
  setRange: (r: PriceRange) => void;
  onConfirm: () => void;
};

export default function RangeTab({ range, setRange, onConfirm }: Props) {
  const minPct = ((range.min - MIN) / (MAX - MIN)) * 100;
  const maxPct = ((range.max - MIN) / (MAX - MIN)) * 100;
  const t = useTranslations('header');
  
  return (
    <div className="flex flex-col gap-4 p-4">

      {/* Price display */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">{t('filter.min_price')}</span>
          <span className="text-sm font-semibold text-neutral-900 dark:text-white">{formatPrice(range.min)}</span>
        </div>
        <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700" />
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">{t('filter.max_price')}</span>
          <span className="text-sm font-semibold text-neutral-900 dark:text-white">{formatPrice(range.max)}</span>
        </div>
      </div>

      {/* Dual range slider */}
      <div className="relative flex items-center h-5">
        {/* Track base */}
        <div className="absolute inset-x-0 h-1 rounded-full bg-neutral-200 dark:bg-neutral-700" />

        {/* Active segment */}
        <div
          className="absolute h-1 rounded-full bg-neutral-900 dark:bg-white"
          style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
        />

        {/* Min input */}
        <input
          type="range"
          min={MIN} max={MAX} step={STEP}
          value={range.min}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v < range.max) setRange({ ...range, min: v });
          }}
          className="absolute inset-0 w-full h-5 opacity-0 cursor-pointer"
          style={{ zIndex: range.min > MAX - STEP * 5 ? 5 : 3 }}
          aria-label="Preço mínimo"
        />

        {/* Max input */}
        <input
          type="range"
          min={MIN} max={MAX} step={STEP}
          value={range.max}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v > range.min) setRange({ ...range, max: v });
          }}
          className="absolute inset-0 w-full h-5 opacity-0 cursor-pointer"
          style={{ zIndex: 4 }}
          aria-label="Preço máximo"
        />

        {/* Visual thumb — min */}
        <div
          className="absolute w-4 h-4 bg-white border-2 rounded-full shadow pointer-events-none dark:bg-neutral-900 border-neutral-900 dark:border-white"
          style={{ left: `calc(${minPct}% - 8px)` }}
        />

        {/* Visual thumb — max */}
        <div
          className="absolute w-4 h-4 bg-white border-2 rounded-full shadow pointer-events-none dark:bg-neutral-900 border-neutral-900 dark:border-white"
          style={{ left: `calc(${maxPct}% - 8px)` }}
        />
      </div>

      {/* Confirm */}
      <button
        onClick={onConfirm}
        className="w-full py-2.5 rounded-xl text-sm font-semibold
          bg-neutral-900 dark:bg-white
          text-white dark:text-neutral-900
          hover:bg-neutral-700 dark:hover:bg-neutral-200
          transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
      >
        {t('filter.confirm')}
      </button>
    </div>
  );
}