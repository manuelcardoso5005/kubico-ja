import { QuickOption } from '@/types/header';

export const QUICK_OPTIONS: QuickOption[] = [
  { label: 'Fim de semana', days: 2, key: 'filter.weekend' },
  { label: '1 semana', days: 7, key: 'filter.week' },
  { label: '1 mês', days: 30, key: 'filter.month' },
];

export const provinces = [
  'Luanda', 'Bengo', 'Benguela', 'Bié', 'Cabinda',
  'Cuando', 'Cubango', 'Cuanza Norte', 'Cuanza Sul', 'Cunene',
  'Huambo', 'Huíla', 'Lunda Norte', 'Lunda Sul', 'Malanje',
  'Moxico', 'Namibe', 'Uíge', 'Zaire'
];