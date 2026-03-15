'use client';

import LanguageSwitcher from './_components/LanguageSwitcher';
import ThemeToggle from './_components/ThemeToggle';
import HeaderLogo from './_components/HeaderLogo';
import Navbar from './_components/Navbar';
import HeaderMenu from './_components/HeaderMenu';

export default function HeaderPage() {
  return (
    <header className="sticky top-0 z-50 w-full bg-gray-100 border-b dark:bg-neutral-950/95 backdrop-blur-sm border-neutral-200 dark:border-neutral-800">
      <div className="relative flex items-center h-16 px-6 mx-auto max-w-7xl">

        {/* esquerda */}
        <div className="flex items-center">
          <HeaderLogo />
        </div>

        {/* centro real */}
        <div className="absolute -translate-x-1/2 left-1/2">
          <Navbar />
        </div>

        {/* direita */}
        <div className="flex items-center gap-1 ml-auto">
          <ThemeToggle />
          <LanguageSwitcher />
          <div className="w-px h-5 mx-2 bg-neutral-200 dark:bg-neutral-700" />
          <HeaderMenu />
        </div>

      </div>
    </header>
  );
}