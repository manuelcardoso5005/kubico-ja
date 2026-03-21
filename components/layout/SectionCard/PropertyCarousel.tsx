'use client';

import { Link } from "@/i18n/routing";
import { ArrowRight, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { RefObject } from "react";

interface Property {
  id: number;
  title: string;
  price: number;
  image: string;
  province: string;
  tipo: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  features: string[];
  slug: string;
  isFeatured: boolean;
}

interface PropertyCarouselProps {
  featuredProperties: Property[];
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  updateArrows: () => void;
  favorites: number[];
  toggleFavorite: (e: React.MouseEvent, id: number) => void;
  formatPrice: (price: number) => string;
}

export default function PropertyCarousel({
  featuredProperties,
  scrollContainerRef,
  updateArrows,
  favorites,
  toggleFavorite,
  formatPrice
}: PropertyCarouselProps) {
  return (
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
  );
}