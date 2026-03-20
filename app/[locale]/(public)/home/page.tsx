'use client';

import { Link } from "@/i18n/routing";
import { ChevronLeft, ChevronRight, ArrowRight, Heart } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { featuredProperties } from "./data";

export default function HomePage() {
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
    <main className="py-8 mx-auto max-w-screen-2xl">
      <section className="px-4 mb-6 md:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
              Casas em destaque
            </h2>
          </div>
          <Link 
            href="/imoveis" 
            className="text-sm font-medium text-neutral-900 dark:text-white hover:underline"
          >
            Ver todas
          </Link>
        </div>
      </section>

      <section className="relative group">
        {/* Botões - escondidos no mobile */}
        {!isMobile && (
          <>
            <AnimatePresence>
              {showLeftArrow && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => scroll('left')}
                  disabled={isScrolling}
                  className="absolute z-10 flex items-center justify-center w-8 h-8 transition-all -translate-y-1/2 bg-white border rounded-full shadow-lg opacity-0 left-6 top-1/2 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:scale-110 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <ChevronLeft size={16} className="text-neutral-900 dark:text-white" />
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showRightArrow && (
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onClick={() => scroll('right')}
                  disabled={isScrolling}
                  className="absolute z-10 flex items-center justify-center w-8 h-8 transition-all -translate-y-1/2 bg-white border rounded-full shadow-lg opacity-0 right-6 top-1/2 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:scale-110 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <ChevronRight size={16} className="text-neutral-900 dark:text-white" />
                </motion.button>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Container do carrossel */}
        <div
          ref={scrollContainerRef}
          onScroll={updateArrows}
          className="grid auto-cols-[minmax(250px,1fr)] grid-flow-col gap-4 pl-4 pr-4 md:gap-5 md:pl-6 md:pr-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredProperties.map((property) => (
            <Link
              key={property.id}
              href={`/imoveis/${property.id}`}
              className="snap-start group/card"
            >
              <div className="relative overflow-hidden rounded-xl">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="object-cover w-full h-[250px] group-hover/card:scale-105 transition-transform duration-300" 
                />
                
                {/* Overlay com província e favorito */}
                <div className="absolute inset-0 p-3">
                  <div className="flex items-start justify-between">
                    {/* Badge da província */}
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/90 dark:bg-neutral-900/90 text-neutral-900 dark:text-white backdrop-blur-sm">
                      {property.province}
                    </span>
                    
                    {/* Botão favoritar */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => toggleFavorite(e, property.id)}
                      className="p-2 transition-all rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm hover:scale-110"
                    >
                      <motion.div
                        initial={false}
                        animate={{
                          scale: favorites.includes(property.id) ? [1, 1.2, 1] : 1
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Heart
                          size={16}
                          className={`transition-colors ${
                            favorites.includes(property.id)
                              ? 'fill-red-500 stroke-red-500'
                              : 'stroke-neutral-900 dark:stroke-white'
                          }`}
                        />
                      </motion.div>
                    </motion.button>
                  </div>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    {property.tipo}
                  </span>
                  <span className="text-xs text-neutral-400">•</span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {property.bedrooms} {property.bedrooms === 1 ? 'quarto' : 'quartos'}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-neutral-900 dark:text-white line-clamp-1">
                  {property.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-neutral-900 dark:text-white">
                  <span className="font-normal">Mensal: </span>
                  {formatPrice(property.price)}
                </p>
              </div>
            </Link>
          ))}

          {/* Card "Ver tudo" */}
          <Link
            href="/imoveis"
            className="snap-start group/show-all flex items-center justify-center min-h-[250px] rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <img 
                  src={featuredProperties[0]?.image} 
                  alt="Ver tudo" 
                  className="object-cover w-20 h-20 rounded-lg opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ArrowRight className="text-neutral-900 dark:text-white" size={24} />
                </div>
              </div>
              <span className="text-sm font-medium text-neutral-900 dark:text-white">
                Ver tudo
              </span>
            </div>
          </Link>
        </div>
      </section>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}