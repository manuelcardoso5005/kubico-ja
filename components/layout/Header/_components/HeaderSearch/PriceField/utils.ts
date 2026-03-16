export const formatPrice = (n: number) => {
  if (n >= 999_999) return 'Sem limite';
  return n.toLocaleString('pt-AO') + ' Kz';
};