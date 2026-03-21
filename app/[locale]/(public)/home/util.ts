import {Property} from '@/types/data'
import { properties} from './data'

// Funções utilitárias
export const getPropertiesByCategory = (category: Property['category']) => {
  return properties.filter(p => p.category === category && p.isFeatured);
};

export const getPropertiesBySubcategory = (subcategory: Property['subcategory']) => {
  return properties.filter(p => p.subcategory === subcategory && p.isFeatured);
};

export const getFeaturedProperties = () => {
  return properties.filter(p => p.isFeatured);
};

// Filtros específicos para os 4 grupos
export const getApartamentosPopulares = () => {
  return properties.filter(p => 
    p.category === 'apartamento' && 
    p.subcategory === 'popular' && 
    p.isFeatured
  );
};

export const getMoradiasLuxo = () => {
  return properties.filter(p => 
    p.category === 'moradia' && 
    p.subcategory === 'luxo' && 
    p.isFeatured
  );
};

export const getEstadiaLuxo = () => {
  return properties.filter(p => 
    p.category === 'estadia-curta' && 
    p.subcategory === 'luxo' && 
    p.isFeatured
  );
};

export const getHoteis = () => {
  return properties.filter(p => 
    p.category === 'hotel' && 
    p.isFeatured
  );
};