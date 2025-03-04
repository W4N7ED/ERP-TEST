
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

// Temporary filter function to filter interventions based on filter criteria
export function filterInterventions(interventions: Intervention[], filters: InterventionFilters): Intervention[] {
  return interventions.filter(intervention => {
    // Filter by keyword (search in title, description, client, technician)
    if (filters.keyword && filters.keyword.trim() !== "") {
      const keyword = filters.keyword.toLowerCase();
      const matchesKeyword = 
        (intervention.title && intervention.title.toLowerCase().includes(keyword)) ||
        (intervention.description && intervention.description.toLowerCase().includes(keyword)) ||
        (intervention.client && intervention.client.toLowerCase().includes(keyword)) ||
        (intervention.technician && intervention.technician.toLowerCase().includes(keyword));
      
      if (!matchesKeyword) return false;
    }
    
    // Filter by status
    if (filters.status && filters.status !== "Tous") {
      if (intervention.status !== filters.status) return false;
    }
    
    // Filter by priority
    if (filters.priority && filters.priority !== "Tous") {
      if (intervention.priority !== filters.priority) return false;
    }
    
    // Filter by type
    if (filters.type && filters.type !== "Tous") {
      if (intervention.type !== filters.type) return false;
    }
    
    // Filter by technician
    if (filters.technician) {
      if (intervention.technician !== filters.technician) return false;
    }
    
    // Filter by client
    if (filters.client) {
      if (intervention.client !== filters.client) return false;
    }
    
    // Filter by date range
    if (filters.dateStart || filters.dateEnd) {
      const interventionDate = new Date(intervention.dateCreated);
      
      if (filters.dateStart && interventionDate < filters.dateStart) return false;
      if (filters.dateEnd) {
        // Add one day to include the end date in the range
        const dateEnd = new Date(filters.dateEnd);
        dateEnd.setDate(dateEnd.getDate() + 1);
        if (interventionDate > dateEnd) return false;
      }
    }
    
    return true;
  });
}
