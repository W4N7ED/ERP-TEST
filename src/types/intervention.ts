
export type Priority = "Critique" | "Haute" | "Moyenne" | "Basse";
export type Status = "À planifier" | "Planifiée" | "En cours" | "En attente" | "Terminée" | "Annulée" | "Archivée";
export type InterventionType = "Panne" | "Installation" | "Maintenance" | "Mise à jour" | "Autre";
export type CreationMode = "Manuelle" | "Automatique" | "Ticket client";

export interface Intervention {
  id: number;
  title: string;
  client: string;
  technician: string;
  status: Status;
  priority: Priority;
  type: InterventionType;
  dateCreated: string;
  deadline: string;
  scheduledDate?: string;
  creationMode: CreationMode;
  description?: string;
  material?: string;
  projectId?: number;
  notes?: string[];
  attachments?: string[];
  relatedTicket?: number;
  archived?: boolean;
}

export interface InterventionFilters {
  status: Status | "Tous" | null;
  priority: Priority | "Tous" | null;
  type: InterventionType | "Tous" | null;
  dateStart: Date | null;
  dateEnd: Date | null;
  technician: string | null;
  client: string | null;
  keyword: string;
}
