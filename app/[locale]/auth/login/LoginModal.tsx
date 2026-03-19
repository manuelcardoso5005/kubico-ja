'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, LogIn, X } from 'lucide-react';
import { useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function LoginModal({ open, onClose }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [open, onClose]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('login:', { email, password });
  };

  const handleGoogleLogin = () => {
    console.log('login com Google');
  };

  const modal = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4
            bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm overflow-hidden bg-white border shadow-2xl dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 rounded-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{    opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-5 pb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 shrink-0">
                <LogIn size={18} strokeWidth={2} className="text-neutral-500" />
              </div>
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="flex items-center justify-center w-8 h-8 transition-colors rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <X size={15} strokeWidth={2} />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 pb-5">
              <h2
                id="login-title"
                className="mb-1 text-base font-semibold text-neutral-900 dark:text-white"
              >
                Entrar
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                Aceda à sua conta para continuar.
              </p>

              <form onSubmit={handleLogin} className="flex flex-col gap-3">
                <div className="relative">
                  <Mail className="absolute text-neutral-400 left-3 top-3" size={16} />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-2.5 pl-9 pr-3 text-sm border rounded-lg
                      bg-neutral-50 dark:bg-neutral-800
                      border-neutral-200 dark:border-neutral-700
                      focus:outline-none focus:ring-2 focus:ring-neutral-400"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute text-neutral-400 left-3 top-3" size={16} />
                  <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-2.5 pl-9 pr-3 text-sm border rounded-lg
                      bg-neutral-50 dark:bg-neutral-800
                      border-neutral-200 dark:border-neutral-700
                      focus:outline-none focus:ring-2 focus:ring-neutral-400"
                    required
                  />
                </div>
              </form>
            </div>

            {/* Divider */}
            <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

            {/* Actions */}
            <div className="flex flex-col gap-2 p-4">
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                onClick={handleLogin}
                className="flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium rounded-xl
                  transition-colors bg-neutral-900 dark:bg-white
                  text-white dark:text-neutral-900
                  hover:bg-neutral-700 dark:hover:bg-neutral-200"
              >
                <LogIn size={14} strokeWidth={2} />
                Entrar
              </motion.button>

              <div className="flex items-center gap-2 px-1">
                <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
                <span className="text-xs text-neutral-400">ou</span>
                <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleGoogleLogin}
                className="flex items-center justify-center w-full gap-2 py-2.5 text-sm font-medium
                  border rounded-xl border-neutral-200 dark:border-neutral-700
                  hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.4 2.4 30.1 0 24 0 14.6 0 6.4 5.6 2.5 13.7l7.8 6.1C12.2 13.2 17.6 9.5 24 9.5z"/>
                  <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-2.8-.4-4H24v7.6h12.7c-.5 2.6-2.1 4.8-4.5 6.3l7 5.4c4.1-3.8 6.3-9.3 6.3-15.3z"/>
                  <path fill="#FBBC05" d="M10.3 28.9c-.6-1.8-.9-3.6-.9-5.4s.3-3.7.9-5.4l-7.8-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.5 10.9l7.8-6z"/>
                  <path fill="#4285F4" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7-5.4c-2 1.4-4.6 2.2-8.9 2.2-6.4 0-11.8-3.7-13.7-9l-7.8 6C6.4 42.4 14.6 48 24 48z"/>
                </svg>
                Entrar com Google
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