'use client';

import { Link, usePathname } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const navLinks = [
  { href: '/', key: 'navigation.homes' },
  { href: '/vocation', key: 'navigation.vacation' },
  { href: '/explore', key: 'navigation.explore' },
];

export default function Navbar() {
  const t = useTranslations('header');
  const pathname = usePathname();

  return (
    <nav className="hidden md:block">
      <ul className="flex items-center gap-1 p-1 m-0 list-none rounded-full bg-neutral-100 dark:bg-neutral-800">
        {navLinks.map(({ href, key }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className="relative flex items-center px-5 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white rounded-full shadow-sm dark:bg-neutral-900"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 transition-colors ${isActive ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'}`}>
                  {t(key)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}