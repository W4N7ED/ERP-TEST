
import { Intervention, InterventionFilters } from "@/types/intervention";

/**
 * Filtre les interventions archivées
 */
export const filterArchivedInterventions = (
  interventions: Intervention[],
  showArchived: boolean
): Intervention[] => {
  if (!showArchived) {
    return interventions.filter(i => i.status !== "Archivée");
  }
  return interventions;
};

/**
 * Filtre les interventions par terme de recherche
 */
export const filterBySearchTerm = (
  interventions: Intervention[],
  searchTerm: string
): Intervention[] => {
  if (searchTerm.trim() === "") {
    return interventions;
  }
  
  const term = searchTerm.toLowerCase();
  return interventions.filter(intervention => 
    intervention.title.toLowerCase().includes(term) ||
    intervention.client.toLowerCase().includes(term) ||
    intervention.technician.toLowerCase().includes(term) ||
    (intervention.material && intervention.material.toLowerCase().includes(term)) ||
    (intervention.description && intervention.description.toLowerCase().includes(term))
  );
};

/**
 * Filtre les interventions par statut
 */
export const filterByStatus = (
  interventions: Intervention[],
  status: string | null
): Intervention[] => {
  if (!status || status === "Tous") {
    return interventions;
  }
  return interventions.filter(i => i.status === status);
};

/**
 * Filtre les interventions par priorité
 */
export const filterByPriority = (
  interventions: Intervention[],
  priority: string | null
): Intervention[] => {
  if (!priority || priority === "Tous") {
    return interventions;
  }
  return interventions.filter(i => i.priority === priority);
};

/**
 * Filtre les interventions par type
 */
export const filterByType = (
  interventions: Intervention[],
  type: string | null
): Intervention[] => {
  if (!type || type === "Tous") {
    return interventions;
  }
  return interventions.filter(i => i.type === type);
};

/**
 * Filtre les interventions par technicien
 */
export const filterByTechnician = (
  interventions: Intervention[],
  technician: string | null
): Intervention[] => {
  if (!technician) {
    return interventions;
  }
  return interventions.filter(i => i.technician === technician);
};

/**
 * Filtre les interventions par client
 */
export const filterByClient = (
  interventions: Intervention[],
  client: string | null
): Intervention[] => {
  if (!client) {
    return interventions;
  }
  return interventions.filter(i => i.client === client);
};

/**
 * Filtre les interventions par date de début
 */
export const filterByStartDate = (
  interventions: Intervention[],
  dateStart: Date | null
): Intervention[] => {
  if (!dateStart) {
    return interventions;
  }
  
  const startDate = new Date(dateStart);
  startDate.setHours(0, 0, 0, 0);
  
  return interventions.filter(i => {
    const date = new Date(i.dateCreated);
    return date >= startDate;
  });
};

/**
 * Filtre les interventions par date de fin
 */
export const filterByEndDate = (
  interventions: Intervention[],
  dateEnd: Date | null
): Intervention[] => {
  if (!dateEnd) {
    return interventions;
  }
  
  const endDate = new Date(dateEnd);
  endDate.setHours(23, 59, 59, 999);
  
  return interventions.filter(i => {
    const date = new Date(i.dateCreated);
    return date <= endDate;
  });
};

/**
 * Applique tous les filtres aux interventions
 */
export const applyAllFilters = (
  interventions: Intervention[],
  filters: InterventionFilters,
  searchTerm: string,
  showArchived: boolean
): Intervention[] => {
  let filtered = [...interventions];
  
  filtered = filterArchivedInterventions(filtered, showArchived);
  filtered = filterBySearchTerm(filtered, searchTerm);
  filtered = filterByStatus(filtered, filters.status);
  filtered = filterByPriority(filtered, filters.priority);
  filtered = filterByType(filtered, filters.type);
  filtered = filterByTechnician(filtered, filters.technician);
  filtered = filterByClient(filtered, filters.client);
  filtered = filterByStartDate(filtered, filters.dateStart);
  filtered = filterByEndDate(filtered, filters.dateEnd);
  
  return filtered;
};
