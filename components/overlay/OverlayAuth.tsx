'use client';

import { ReactNode } from 'react';
import { X } from 'lucide-react';
import Overlay from './Overlay';

interface OverlayAuthProps {
  clickOutside: () => void;
  children: ReactNode;
  onClose?: () => void;
  icon?: ReactNode;
  title?: string;
  legend?: string;
}

export default function OverlayAuth({ clickOutside, children, onClose, icon, title, legend }: OverlayAuthProps) {
  return (
    <Overlay clickOutside={clickOutside}>
      {/* Header */}
      <div className="flex items-start justify-between p-5 pb-4">
        {icon && (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 shrink-0">
            {icon}
          </div>
        )}
        <button
          onClick={onClose ?? clickOutside}
          aria-label="Fechar"
          className="flex items-center justify-center w-8 h-8 transition-colors rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <X size={15} strokeWidth={2} />
        </button>
      </div>
      
      {/* Body */}
      <div className="px-5 pb-5">
        {title && (
          <h2 className="mb-1 text-base font-semibold text-neutral-900 dark:text-white">
            {title}
          </h2>
        )}
        {legend && (
          <p className="mb-4 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            {legend}
          </p>
        )}
      </div>
      {children}
    </Overlay>
  );
}