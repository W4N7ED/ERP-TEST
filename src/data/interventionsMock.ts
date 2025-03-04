
import { Intervention } from "@/types/intervention";

// Sample data for development
export const interventionsMock: Intervention[] = [
  {
    id: 1,
    title: "Panne ordinateur bureau",
    client: "Dupont Entreprises",
    technician: "Jean Martin",
    status: "En cours",
    priority: "Haute",
    type: "Panne",
    dateCreated: "2023-06-15",
    deadline: "2023-06-20",
    scheduledDate: "2023-06-18",
    creationMode: "Manuelle",
    description: "L'ordinateur ne démarre plus, écran bleu au démarrage",
    material: "PC Dell Latitude 5520"
  },
  {
    id: 2,
    title: "Installation nouvel équipement",
    client: "Société ABC",
    technician: "Marie Dubois",
    status: "À planifier",
    priority: "Moyenne",
    type: "Installation",
    dateCreated: "2023-06-16",
    deadline: "2023-06-25",
    creationMode: "Manuelle",
    material: "3 PC HP ProBook, 1 imprimante réseau"
  }
];

export const techniciansList: string[] = [
  "Jean Martin",
  "Marie Dubois",
  "Pierre Leroy",
  "Sophie Bernard"
];

export const clientsList: string[] = [
  "Dupont Entreprises",
  "Société ABC",
  "Martin & Fils",
  "Tech Solutions"
];
