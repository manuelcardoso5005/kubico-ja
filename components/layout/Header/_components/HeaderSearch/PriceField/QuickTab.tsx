import { QUICK_OPTIONS_ } from "@/data/constants";
import { PriceSelection, QuickPrice } from "@/types/header";
import { useTranslations } from 'next-intl';

type Props = {
  selection: PriceSelection;
  onSelect: (opt: QuickPrice) => void;
};

export default function QuickTab({ selection, onSelect }: Props) {
  const t = useTranslations('header');
  return (
    <ul className="p-1.5 flex flex-col gap-0.5">
      {QUICK_OPTIONS_.map((opt) => {
        const selected =
          selection?.kind === "quick" &&
          selection.option.key === opt.key;

        return (
          <li key={opt.label}>
            <button
              onClick={() => onSelect(opt)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-colors
                ${
                  selected
                    ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium"
                    : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
            >
              <span> {t(opt.key)}</span>
              {selected && (
                <span className="text-[10px] text-neutral-300 dark:text-neutral-600">
                    ✓
                </span>
                )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}