
import { Project } from "./project";

export type QuoteStatus = 'Brouillon' | 'En attente' | 'Envoyé' | 'Validé' | 'Refusé' | 'Expiré';

export interface QuoteItem {
  id: number;
  type: 'Produit' | 'Service' | 'Forfait';
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
  discount?: number; // en pourcentage
  taxRate: number; // en pourcentage
  total: number; // Prix total avec remise et taxes
  inventoryItemId?: number; // Pour les produits liés à l'inventaire
}

export interface QuoteContact {
  name: string;
  company?: string;
  address: string;
  email: string;
  phone: string;
}

export interface Quote {
  id: number;
  reference: string;
  createdAt: string;
  expirationDate: string;
  status: QuoteStatus;
  client: QuoteContact;
  issuer: {
    name: string;
    department: string;
    role: string;
  };
  items: QuoteItem[];
  subtotal: number;
  taxTotal: number;
  discount?: {
    type: 'Percentage' | 'Fixed';
    value: number;
    amount: number;
  };
  total: number;
  notes?: string;
  terms?: string;
  projectId?: number;
  interventionId?: number;
  responsibleId: number;
  responsibleName: string;
  history: {
    date: string;
    action: string;
    user: string;
  }[];
  signatureUrl?: string;
}

// Données de démonstration pour les devis
export const quotesMock: Quote[] = [
  {
    id: 1,
    reference: "DEV-2023-001",
    createdAt: "2023-09-05",
    expirationDate: "2023-10-05",
    status: "Validé",
    client: {
      name: "Jean Dupont",
      company: "Entreprise ABC",
      address: "123 Rue de la Paix, 75001 Paris",
      email: "jean.dupont@entrepriseabc.fr",
      phone: "01 23 45 67 89",
    },
    issuer: {
      name: "Marie Lambert",
      department: "Service Commercial",
      role: "Commercial",
    },
    items: [
      {
        id: 1,
        type: "Produit",
        name: "PC Portable Dell Latitude 5520",
        description: "Core i5, 16Go RAM, 512 Go SSD",
        unitPrice: 1200,
        quantity: 5,
        taxRate: 20,
        total: 7200,
        inventoryItemId: 7,
      },
      {
        id: 2,
        type: "Service",
        name: "Installation et configuration",
        description: "Installation Windows, logiciels et intégration au domaine",
        unitPrice: 150,
        quantity: 5,
        taxRate: 20,
        total: 900,
      },
      {
        id: 3,
        type: "Forfait",
        name: "Pack sécurité",
        description: "Antivirus entreprise + Firewall logiciel (licence 1 an)",
        unitPrice: 75,
        quantity: 5,
        taxRate: 20,
        total: 450,
      },
    ],
    subtotal: 8550,
    taxTotal: 1710,
    total: 10260,
    notes: "Délai de livraison estimé à 2 semaines après acceptation du devis.",
    terms: "Ce devis est valable 30 jours. Paiement à 30 jours après installation.",
    projectId: 2,
    responsibleId: 2,
    responsibleName: "Marie Lambert",
    history: [
      {
        date: "2023-09-05",
        action: "Création",
        user: "Marie Lambert",
      },
      {
        date: "2023-09-10",
        action: "Envoyé au client",
        user: "Marie Lambert",
      },
      {
        date: "2023-09-15",
        action: "Validé par le client",
        user: "Jean Dupont",
      },
    ],
    signatureUrl: "/signatures/signature-jean-dupont.png",
  },
  {
    id: 2,
    reference: "DEV-2023-002",
    createdAt: "2023-09-10",
    expirationDate: "2023-10-10",
    status: "En attente",
    client: {
      name: "Sophie Martin",
      company: "Cabinet GHI",
      address: "456 Avenue Victor Hugo, 75016 Paris",
      email: "sophie.martin@ghi.fr",
      phone: "01 98 76 54 32",
    },
    issuer: {
      name: "Alex Thibault",
      department: "Service Technique",
      role: "Expert technique",
    },
    items: [
      {
        id: 4,
        type: "Produit",
        name: "Serveur Dell PowerEdge R740",
        description: "2x Intel Xeon, 64GB RAM, 4x 1TB SSD RAID",
        unitPrice: 4500,
        quantity: 1,
        taxRate: 20,
        total: 4500,
      },
      {
        id: 5,
        type: "Service",
        name: "Configuration et migration",
        description: "Installation, configuration et migration des données depuis l'ancien serveur",
        unitPrice: 1800,
        quantity: 1,
        taxRate: 20,
        total: 1800,
      },
      {
        id: 6,
        type: "Forfait",
        name: "Contrat de maintenance 3 ans",
        description: "Support 7j/7, interventions sous 4h, pièces incluses",
        unitPrice: 2400,
        quantity: 1,
        taxRate: 20,
        total: 2400,
        discount: 10,
      },
    ],
    subtotal: 8700,
    taxTotal: 1570,
    discount: {
      type: "Percentage",
      value: 10,
      amount: 240, // 10% sur le forfait de maintenance
    },
    total: 10030,
    notes: "Installation prévue un week-end pour limiter l'impact sur l'activité.",
    terms: "Acompte de 30% à la commande, solde à la mise en service.",
    projectId: 4,
    responsibleId: 3,
    responsibleName: "Alex Thibault",
    history: [
      {
        date: "2023-09-10",
        action: "Création",
        user: "Alex Thibault",
      },
      {
        date: "2023-09-12",
        action: "Envoyé au client",
        user: "Alex Thibault",
      },
    ],
  },
  {
    id: 3,
    reference: "DEV-2023-003",
    createdAt: "2023-09-15",
    expirationDate: "2023-10-15",
    status: "Brouillon",
    client: {
      name: "Pierre Leroy",
      company: "Boutique DEF",
      address: "789 Boulevard Saint-Michel, 75005 Paris",
      email: "p.leroy@boutique-def.fr",
      phone: "01 45 67 89 10",
    },
    issuer: {
      name: "Jean Dupont",
      department: "Service Technique",
      role: "Technicien senior",
    },
    items: [
      {
        id: 7,
        type: "Produit",
        name: "Switch Cisco 24 ports",
        description: "Catalyst 2960, 24 ports Gigabit",
        unitPrice: 599.99,
        quantity: 2,
        taxRate: 20,
        total: 1199.98,
        inventoryItemId: 5,
      },
      {
        id: 8,
        type: "Produit",
        name: "Câble réseau Cat 6 (5m)",
        description: "Câble Ethernet Cat 6 blindé",
        unitPrice: 9.99,
        quantity: 20,
        taxRate: 20,
        total: 199.8,
        inventoryItemId: 8,
      },
      {
        id: 9,
        type: "Service",
        name: "Installation et configuration réseau",
        description: "Installation, câblage et paramétrage du réseau local",
        unitPrice: 450,
        quantity: 1,
        taxRate: 20,
        total: 450,
      },
    ],
    subtotal: 1849.78,
    taxTotal: 369.96,
    total: 2219.74,
    notes: "Installation programmée pour le 20/10/2023.",
    projectId: 3,
    responsibleId: 1,
    responsibleName: "Jean Dupont",
    history: [
      {
        date: "2023-09-15",
        action: "Création",
        user: "Jean Dupont",
      },
    ],
  }
];
