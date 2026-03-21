export interface Property {
  id: number;
  title: string;
  price: number;
  image: string;
  province: string;
  tipo: string;
  category: 'apartamento' | 'moradia' | 'estadia-curta' | 'hotel';
  subcategory?: 'popular' | 'luxo' | 'hotel' | 'motel' | 'pensao' | 'casa-temporada';
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  features: string[];
  slug: string;
  isFeatured: boolean;
  minStay?: number; // Para estadias curtas (em noites)
}