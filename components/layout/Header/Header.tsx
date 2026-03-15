'use client';

import LanguageSwitcher from './_components/LanguageSwitcher';
import ThemeToggle from './_components/ThemeToggle';
import HeaderLogo from './_components/HeaderLogo';
import Navbar from './_components/Navbar';
import HeaderMenu from './_components/HeaderMenu';
import HeaderSearch from './_components/HeaderSearch/HeaderSearch';

export default function HeaderPage() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-neutral-950/95 backdrop-blur-sm border-neutral-200 dark:border-neutral-800">

      {/* Linha 1 — Logo | Nav | Controlos */}
      <div className="relative flex items-center h-16 px-6 mx-auto max-w-screen-2xl">

        {/* Esquerda */}
        <HeaderLogo />

        {/* Centro — absolutamente centrado */}
        <div className="absolute hidden -translate-x-1/2 left-1/2 md:block">
          <Navbar />
        </div>

        {/* Direita */}
        <div className="flex items-center gap-1 ml-auto">
          <ThemeToggle />
          <LanguageSwitcher />
          <div className="w-px h-5 mx-2 bg-neutral-200 dark:bg-neutral-700" />
          <HeaderMenu />
        </div>

      </div>

      {/* Linha 2 — Search */}
      <div className="px-6 py-2.5 max-w-screen-2xl mx-auto">
        <HeaderSearch />
      </div>

    </header>
  );
}