'use client';

import { Link, usePathname } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const navLinks = [
  { href: '/', key: 'navigation.homes' },
  { href: '/contact', key: 'navigation.vacation' },
  { href: '/about', key: 'navigation.explore' },
];

export default function Navbar() {
  const t = useTranslations('header');
  const pathname = usePathname();

  return (
    <nav className="hidden md:block">
      <ul className="flex items-center gap-1 m-0 list-none">
        {navLinks.map(({ href, key }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={`relative flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                    ${isActive
                    ? 'text-neutral-900 dark:text-white'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800'
                    }`}
                >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-neutral-100 dark:bg-neutral-800"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t(key)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}