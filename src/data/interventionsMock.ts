
import { Intervention } from "@/types/intervention";

export const interventionsMock: Intervention[] = [
  { 
    id: 1, 
    title: "Remplacement disque SSD", 
    client: "Entreprise ABC", 
    technician: "Jean Dupont",
    status: "En cours", 
    priority: "Moyenne",
    type: "Panne",
    dateCreated: "2023-09-10", 
    deadline: "2023-09-17",
    scheduledDate: "2023-09-15",
    creationMode: "Manuelle",
    material: "PC Portable Dell XPS",
    description: "Client signale des lenteurs importantes et des erreurs de lecture/écriture",
    notes: ["Disque SSD 512Go commandé", "Prévoir sauvegarde des données"]
  },
  { 
    id: 2, 
    title: "Installation imprimante réseau", 
    client: "Société XYZ", 
    technician: "Marie Lambert",
    status: "Planifiée", 
    priority: "Basse",
    type: "Installation",
    dateCreated: "2023-09-12", 
    deadline: "2023-09-20",
    scheduledDate: "2023-09-18",
    creationMode: "Ticket client",
    relatedTicket: 3245,
    material: "Imprimante HP LaserJet",
    description: "Configuration de la nouvelle imprimante sur le réseau de l'entreprise"
  },
  { 
    id: 3, 
    title: "Maintenance serveur", 
    client: "Agence 123", 
    technician: "Alex Thibault",
    status: "Terminée", 
    priority: "Haute",
    type: "Maintenance",
    dateCreated: "2023-09-05", 
    deadline: "2023-09-14",
    scheduledDate: "2023-09-09",
    creationMode: "Automatique",
    material: "Serveur Dell PowerEdge",
    projectId: 2,
    description: "Maintenance trimestrielle planifiée",
    notes: ["Mise à jour firmware effectuée", "Nettoyage ventilateurs"]
  },
  { 
    id: 4, 
    title: "Dépannage réseau", 
    client: "Boutique DEF", 
    technician: "Claire Petit",
    status: "Terminée", 
    priority: "Critique",
    type: "Panne",
    dateCreated: "2023-09-08", 
    deadline: "2023-09-13",
    scheduledDate: "2023-09-08",
    creationMode: "Ticket client",
    relatedTicket: 3240,
    material: "Switch Cisco Catalyst",
    description: "Réseau totalement inaccessible, urgence commerciale",
    notes: ["Switch remplacé", "Configuration restaurée depuis sauvegarde"]
  },
  { 
    id: 5, 
    title: "Mise à jour des postes de travail", 
    client: "Cabinet GHI", 
    technician: "Jean Dupont",
    status: "En cours", 
    priority: "Moyenne",
    type: "Mise à jour",
    dateCreated: "2023-09-11", 
    deadline: "2023-09-18",
    scheduledDate: "2023-09-16",
    creationMode: "Manuelle",
    projectId: 1,
    material: "20 PC Dell Optiplex",
    description: "Migration Windows 10 vers Windows 11"
  },
  { 
    id: 6, 
    title: "Réparation serveur de données", 
    client: "Restaurant JKL", 
    technician: "Alex Thibault",
    status: "Annulée", 
    priority: "Critique",
    type: "Panne",
    dateCreated: "2023-09-09", 
    deadline: "2023-09-15",
    scheduledDate: "2023-09-10",
    creationMode: "Ticket client",
    relatedTicket: 3242,
    material: "NAS Synology",
    description: "Le client a trouvé une autre solution"
  },
  { 
    id: 7, 
    title: "Installation de postes de travail", 
    client: "Clinique MNO", 
    technician: "Marie Lambert",
    status: "À planifier", 
    priority: "Basse",
    type: "Installation",
    dateCreated: "2023-09-13", 
    deadline: "2023-09-25",
    creationMode: "Manuelle",
    material: "5 PC HP EliteDesk",
    description: "Installation et configuration de nouveaux postes"
  }
];

export const techniciansList = [
  "Jean Dupont",
  "Marie Lambert",
  "Alex Thibault",
  "Claire Petit",
  "Thomas Martin",
  "Sophie Bernard"
];

export const clientsList = [
  "Entreprise ABC",
  "Société XYZ",
  "Agence 123",
  "Boutique DEF",
  "Cabinet GHI",
  "Restaurant JKL",
  "Clinique MNO"
];
