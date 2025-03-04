
import { Intervention } from "@/types/intervention";
import { localStorageAdapter } from "../storage/localStorageAdapter";

const INTERVENTIONS_KEY = 'interventions';

/**
 * Opérations sur les interventions
 */
export const interventionOperations = {
  /**
   * Récupère toutes les interventions
   */
  getAll(): Intervention[] {
    return localStorageAdapter.getData<Intervention[]>(INTERVENTIONS_KEY) || [];
  },

  /**
   * Sauvegarde toutes les interventions
   */
  saveAll(interventions: Intervention[]): boolean {
    return localStorageAdapter.saveData(INTERVENTIONS_KEY, interventions);
  },

  /**
   * Ajoute une intervention
   */
  add(intervention: Omit<Intervention, "id">): Intervention {
    const interventions = this.getAll();
    
    const newId = interventions.length > 0 
      ? Math.max(...interventions.map(i => i.id)) + 1 
      : 1;
      
    const newIntervention = { ...intervention, id: newId } as Intervention;
    interventions.push(newIntervention);
    
    this.saveAll(interventions);
    return newIntervention;
  },

  /**
   * Met à jour une intervention
   */
  update(id: number, partialIntervention: Partial<Intervention>): Intervention | null {
    const interventions = this.getAll();
    const index = interventions.findIndex(i => i.id === id);
    
    if (index === -1) return null;
    
    const updated = { ...interventions[index], ...partialIntervention };
    interventions[index] = updated;
    
    this.saveAll(interventions);
    return updated;
  },

  /**
   * Supprime une intervention
   */
  delete(id: number): boolean {
    const interventions = this.getAll();
    const initialLength = interventions.length;
    const filteredInterventions = interventions.filter(i => i.id !== id);
    
    if (filteredInterventions.length < initialLength) {
      this.saveAll(filteredInterventions);
      return true;
    }
    
    return false;
  },

  /**
   * Récupère la liste des techniciens
   */
  getTechnicians(): string[] {
    const interventions = this.getAll();
    const technicians = new Set<string>();
    
    interventions.forEach(i => {
      if (i.technician) technicians.add(i.technician);
    });
    
    return Array.from(technicians);
  },

  /**
   * Récupère la liste des clients
   */
  getClients(): string[] {
    const interventions = this.getAll();
    const clients = new Set<string>();
    
    interventions.forEach(i => {
      if (i.client) clients.add(i.client);
    });
    
    return Array.from(clients);
  }
};
