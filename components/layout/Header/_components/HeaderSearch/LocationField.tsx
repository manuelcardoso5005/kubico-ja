'use client';

import { MapPin } from 'lucide-react';

export default function LocationField({ active, onClick, onHoverChange }: any) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      className={`flex flex-col justify-center px-5 py-3 text-left flex-[1.4] rounded-full transition-colors
      ${
        active
          ? 'bg-neutral-50 dark:bg-neutral-800'
          : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
      }`}
    >
      <span className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white mb-0.5">
        <MapPin size={12} strokeWidth={2} />
        Destino
      </span>

      <span className="text-xs truncate text-neutral-400">
        Para onde?
      </span>
    </button>
  );
}