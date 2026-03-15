'use client';

import { useState, useRef, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Settings, Power, UserRound, Home, Plane, Compass } from 'lucide-react';
import { useTranslations } from 'next-intl';

const menuItems = [
  { href: '/profile', label: 'auth.profile', icon: UserRound },
  { href: '/settings', label: 'auth.settings', icon: Settings },
];

const navLinks = [
  { href: '/', key: 'navigation.homes', icon: Home },
  { href: '/contact', key: 'navigation.vacation', icon: Plane },
  { href: '/about', key: 'navigation.explore', icon: Compass },
];

export default function HeaderMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('header');

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={menuRef}>

      {/* Trigger */}
      <motion.button
        whileHover={{ boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15 }}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 cursor-pointer transition-colors hover:border-neutral-300 dark:hover:border-neutral-600"
      >
        <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <Menu size={15} strokeWidth={1.8} className="text-neutral-600 dark:text-neutral-400" />
        </motion.span>
        <div className="w-6 h-6 overflow-hidden rounded-full ring-1 ring-neutral-200 dark:ring-neutral-700">
          <img
            src="https://i.ibb.co/KdHHGN2/0f28d7d89a3a1cd9e2b4bf1bb9172030.jpg"
            alt="avatar"
            className="object-cover w-full h-full"
          />
        </div>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-50 mt-2 overflow-hidden bg-white border shadow-xl w-52 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 rounded-xl"
          >
            {/* Header do utilizador */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-100 dark:border-neutral-800">
              <div className="w-8 h-8 overflow-hidden rounded-full ring-1 ring-neutral-200 dark:ring-neutral-700 shrink-0">
                <img
                  src="https://i.ibb.co/KdHHGN2/0f28d7d89a3a1cd9e2b4bf1bb9172030.jpg"
                  alt="avatar"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold truncate text-neutral-900 dark:text-white">
                  Fulano de Tal
                </span>
                <span className="text-xs truncate text-neutral-400">fulano@email.com</span>
              </div>
            </div>

            {/* Nav links — apenas em mobile */}
            <div className="p-1 border-b md:hidden border-neutral-100 dark:border-neutral-800">
              {navLinks.map(({ href, key, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  <Icon size={14} strokeWidth={1.8} />
                  {t(key)}
                </Link>
              ))}
            </div>

            {/* Links de conta */}
            <div className="p-1">
              {menuItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  <Icon size={14} strokeWidth={1.8} />
                  {t(label)}
                </Link>
              ))}
            </div>

            {/* Sair */}
            <div className="p-1 border-t border-neutral-100 dark:border-neutral-800">
              <button
                onClick={() => setOpen(false)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer"
              >
                <Power size={14} strokeWidth={1.8} />
                {t('auth.logout')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}