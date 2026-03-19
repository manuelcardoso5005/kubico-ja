'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from '../../UI/LanguageSwitcher';
import ThemeToggle from '../../UI/ThemeToggle';
import HeaderLogo from './_components/HeaderLogo/HeaderLogo';
import Navbar from './_components/Navbar';
import HeaderMenu from './_components/HeaderMenu/HeaderMenu';
import HeaderSearch from './_components/HeaderSearch/HeaderSearch';
import AuthPanel from './_components/AuthPanel/authpanel';

export default function HeaderPage() {
  //const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const isAuth = true;
  
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);
  

  useEffect(() => {
    const hasToken = document.cookie
      .split("; ")
      .some(c => c.startsWith("token="));

    //setIsAuth(hasToken);
    //setIsAuth(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-neutral-950/95 backdrop-blur-sm border-neutral-200 dark:border-neutral-800">

      {/* Linha 1 — Logo | Nav/Search | Controlos */}
      <div className="relative flex items-center h-16 px-6 mx-auto max-w-screen-2xl">

        {/* Esquerda */}
        <HeaderLogo />

        {/* Centro — Navbar ou Search consoante scroll */}
        <div className="absolute hidden -translate-x-1/2 left-1/2 md:block">
          <AnimatePresence mode="wait">
            {!scrolled ? (
              <motion.div
                key="navbar"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <Navbar />
              </motion.div>
            ) : (
              <motion.div
                key="search"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
              >
                <HeaderSearch compact />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Direita */}
        <div className="flex items-center gap-1 ml-auto">
          <ThemeToggle />
          <LanguageSwitcher />
          
          <div className="w-px h-5 mx-2 bg-neutral-200 dark:bg-neutral-700" />
          {isAuth ? <AuthPanel /> : <HeaderMenu />}
        </div>
      </div>

      {/* Linha 2 — Search (só visível sem scroll) */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            key="search-bar"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className=""
          >
            <div className="px-6 py-2.5 max-w-screen-2xl mx-auto">
              <HeaderSearch />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}