
// Type labels for different leave types
export const typeLabels: Record<string, string> = {
  annual: 'Congés annuels',
  sick: 'Maladie',
  family: 'Familial',
  unpaid: 'Sans solde',
  other: 'Autre'
};

// Define allowed badge variants to match the UI component
export const statusBadgeVariants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  approved: 'default',
  pending: 'secondary',
  rejected: 'destructive'
};
