
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('fr-FR');
};

export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
};
