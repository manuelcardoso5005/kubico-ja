'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { LogOut, X } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function LogoutConfirmModal({ open, onClose, onConfirm }: Props) {
  const t = useTranslations('header');

  useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [open, onClose]);

  const modal = (
    <AnimatePresence>
      {open && (
        // Overlay — flex centra o modal sem transforms
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4
            bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Modal — stopPropagation impede fechar ao clicar dentro */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm overflow-hidden bg-white border shadow-2xl dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 rounded-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{    opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-5 pb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950 shrink-0">
                <LogOut size={18} strokeWidth={2} className="text-rose-500" />
              </div>
              <button
                onClick={onClose}
                aria-label={t('auth.cancel')}
                className="flex items-center justify-center w-8 h-8 transition-colors rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <X size={15} strokeWidth={2} />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 pb-5">
              <h2
                id="logout-title"
                className="mb-1 text-base font-semibold text-neutral-900 dark:text-white"
              >
                {t('auth.logout')}
              </h2>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {t('auth.logout_confirm')}
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

            {/* Actions */}
            <div className="flex gap-2 p-4">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="flex-1 py-2.5 text-sm font-medium rounded-xl transition-colors
                  bg-neutral-100 dark:bg-neutral-800
                  text-neutral-700 dark:text-neutral-300
                  hover:bg-neutral-200 dark:hover:bg-neutral-700"
              >
                {t('auth.cancel')}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onConfirm}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium rounded-xl transition-colors
                  bg-rose-500 hover:bg-rose-600 text-white"
              >
                <LogOut size={14} strokeWidth={2} />
                {t('auth.logout')}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof window === 'undefined') return null;
  return createPortal(modal, document.body);
}