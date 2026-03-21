'use client';

import SectionHeader from './SectionHeader'

interface SectionContentProps {
  title: string;
  href: string;
  isMobile: boolean;
  showLeftArrow: boolean;
  showRightArrow: boolean;
  isScrolling: boolean;
  scroll: (direction: 'left' | 'right') => void;
  children: React.ReactNode;
}

export default function SectionContent({
  title,
  href,
  isMobile,
  showLeftArrow,
  showRightArrow,
  isScrolling,
  scroll,
  children
}: SectionContentProps) {
  return (
    <section className="py-8 mx-auto max-w-screen-2xl">
      <SectionHeader
        title={title}
        href={href}
        isMobile={isMobile}
        showLeftArrow={showLeftArrow}
        showRightArrow={showRightArrow}
        isScrolling={isScrolling}
        scroll={scroll}
      />

      {children}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}