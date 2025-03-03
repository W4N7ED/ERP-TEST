
// Données pour le graphique de statuts
export const statusChartData = [
  { name: "En attente", value: 12, color: "#FBBF24" },  // amber-400
  { name: "En cours", value: 18, color: "#3B82F6" },    // blue-500
  { name: "Terminé", value: 25, color: "#10B981" },     // green-500
  { name: "Annulé", value: 5, color: "#EF4444" }        // red-500
];

// Interventions récentes
export const recentInterventions = [
  { id: 1, title: "Remplacement disque SSD", client: "Entreprise ABC", status: "En cours", date: "2023-09-15" },
  { id: 2, title: "Installation imprimante réseau", client: "Société XYZ", status: "En attente", date: "2023-09-16" },
  { id: 3, title: "Maintenance serveur", client: "Agence 123", status: "Terminé", date: "2023-09-14" },
  { id: 4, title: "Dépannage réseau", client: "Boutique DEF", status: "Terminé", date: "2023-09-13" }
];

// Définition des widgets disponibles avec la taille par défaut
export const availableWidgets = [
  { id: "interventionsEnCours", title: "Interventions en cours", enabled: true, size: "small" as const },
  { id: "stockTotal", title: "Stock total", enabled: true, size: "small" as const },
  { id: "projetsActifs", title: "Projets actifs", enabled: true, size: "small" as const },
  { id: "devisEnAttente", title: "Devis en attente", enabled: true, size: "small" as const },
  { id: "interventionsRecentes", title: "Interventions récentes", enabled: true, size: "medium" as const },
  { id: "statutsInterventions", title: "Statuts des interventions", enabled: true, size: "medium" as const },
  { id: "equipeTechnique", title: "Équipe technique", enabled: true, size: "full" as const },
];
