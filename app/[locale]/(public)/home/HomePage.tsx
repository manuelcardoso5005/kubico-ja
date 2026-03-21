'use client';

import { useRef, useState, useEffect } from "react";
import { getApartamentosPopulares, 
  getMoradiasLuxo, 
  getEstadiaLuxo, 
  getHoteis  } from "./util";
import {Property} from '@/types/data'
import PropertyCarousel from '@/components/layout/SectionCard/PropertyCarousel';
import SectionContent from '@/components/layout/SectionCard/SectionContent';

// Componente reutilizável para cada seção
function PropertySection({ 
  title, 
  href, 
  properties 
}: { 
  title: string; 
  href: string;
  properties: Property[];
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current && !isScrolling) {
      setIsScrolling(true);
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth;
      
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });

      setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    }
  };

  const updateArrows = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    updateArrows();
    
    window.addEventListener('resize', checkMobile);
    window.addEventListener('resize', updateArrows);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('resize', updateArrows);
    };
  }, []);

  return (
    <SectionContent
      title={title}
      href={href}
      isMobile={isMobile}
      showLeftArrow={showLeftArrow}
      showRightArrow={showRightArrow}
      isScrolling={isScrolling}
      scroll={scroll}
    >
      <section className="relative">
        <PropertyCarousel
          featuredProperties={properties}
          scrollContainerRef={scrollContainerRef}
          updateArrows={updateArrows}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          formatPrice={formatPrice}
        />
      </section>
    </SectionContent>
  );
}

export default function HomePage() {
  return (
    <main>
      {/* Apartamentos Populares */}
      <PropertySection 
        title="Apartamentos Populares" 
        href="/imoveis/apartamentos"
        properties={getApartamentosPopulares()}
      />

      {/* Moradias de Luxo */}
      <PropertySection 
        title="Moradias de Luxo" 
        href="/imoveis/moradias-luxo"
        properties={getMoradiasLuxo()}
      />

      {/* Estadia de Luxo */}
      <PropertySection 
        title="Estadia de Luxo" 
        href="/imoveis/estadia-luxo"
        properties={getEstadiaLuxo()}
      />

      {/* Hotéis */}
      <PropertySection 
        title="Hotéis & Resorts" 
        href="/imoveis/hoteis"
        properties={getHoteis()}
      />
    </main>
  );
}