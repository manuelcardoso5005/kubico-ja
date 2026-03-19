import { QuickOption } from '@/types/header';

export const QUICK_OPTIONS: QuickOption[] = [
  { label: 'Fim de semana', days: 2, key: 'filter.weekend' },
  { label: '1 semana', days: 7, key: 'filter.week' },
  { label: '1 mês', days: 30, key: 'filter.month' },
];

export const provinces = [
  'Qualquer','Luanda', 'Bengo', 'Benguela', 'Bié', 'Cabinda',
  'Cuando', 'Cubango', 'Cuanza Norte', 'Cuanza Sul', 'Cunene',
  'Huambo', 'Huíla', 'Lunda Norte', 'Lunda Sul', 'Malanje',
  'Moxico', 'Namibe', 'Uíge', 'Zaire'
];

import { QuickPrice } from "@/types/header";

export const QUICK_OPTIONS_: QuickPrice[] = [
  { label: 'Até 5 000 Kz', max: 5_000, key: 'filter.low' },
  { label: '5 000–15 000 Kz', max: 15_000, key: 'filter.medium' },
  { label: '15 000 Kz+', max: 999_999, key: 'filter.high' },
];

export const MIN = 0;
export const MAX = 50_000;
export const STEP = 500;