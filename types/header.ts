export type ActiveField = 'location' | 'estadia' | 'preco' | null;


/* Stay Field types */
export type QuickOption = { label: string; days: number };
export type DateRange = { from: string; to: string };
export type Selection =
  | { kind: 'quick'; option: QuickOption }
  | { kind: 'custom'; range: DateRange }
  | null;