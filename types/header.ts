export type ActiveField = 'location' | 'estadia' | 'preco' | null;


/* Stay Field types */
export type QuickOption = { label: string; days: number , key: string};
export type DateRange = { from: string; to: string };
export type Selection =
  | { kind: 'quick'; option: QuickOption }
  | { kind: 'custom'; range: DateRange }
  | null;

export type QuickPrice = { label: string; max: number, key: string };

export type PriceRange = {
  min: number;
  max: number;
};

export type PriceSelection =
  | { kind: 'quick'; option: QuickPrice }
  | { kind: 'range'; range: PriceRange }
  | null;

export type Props = {
  active: boolean;
  onClick: () => void;
  onHoverChange?: (hover: boolean) => void;
  onChange?: (selection: PriceSelection) => void;
  onClose?: () => void;
};

export const formatPrice = (n: number) => {
  if (n >= 999_999) return 'Sem limite';
  return n.toLocaleString('pt-AO') + ' Kz';
};