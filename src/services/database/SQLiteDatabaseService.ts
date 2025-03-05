
import { DatabaseService, DatabaseConfig } from "./types";
import { Intervention } from "@/types/intervention";
import { Project } from "@/types/project";
import { toast } from "sonner";
import { interventionOperations } from "./operations/interventionOperations";
import { projectOperations } from "./operations/projectOperations";

/**
 * Implémentation SQLite utilisant localStorage pour l'environnement navigateur
 */
export class SQLiteDatabaseService implements DatabaseService {
  private connected: boolean = false;
  private config: DatabaseConfig;

  constructor(config: DatabaseConfig) {
    this.config = config;
  }

  async connect(): Promise<{ success: boolean; message: string }> {
    try {
      this.connected = true;
      return { 
        success: true, 
        message: `Connecté à la base de données SQLite ${this.config.database || 'en mémoire'}` 
      };
    } catch (error) {
      console.error("Erreur de connexion à la base de données SQLite:", error);
      return { 
        success: false, 
        message: `Échec de connexion à la base de données SQLite: ${error instanceof Error ? error.message : 'Erreur inconnue'}` 
      };
    }
  }

  async disconnect(): Promise<void> {
    this.connected = false;
  }

  isConnected(): boolean {
    return this.connected;
  }

  // Méthodes pour les interventions
  async getInterventions(): Promise<Intervention[]> {
    this.checkConnection();
    return interventionOperations.getAll();
  }

  async addIntervention(intervention: Omit<Intervention, "id">): Promise<Intervention> {
    this.checkConnection();
    return interventionOperations.add(intervention);
  }

  async updateIntervention(id: number, intervention: Partial<Intervention>): Promise<Intervention | null> {
    this.checkConnection();
    return interventionOperations.update(id, intervention);
  }

  async deleteIntervention(id: number): Promise<boolean> {
    this.checkConnection();
    return interventionOperations.delete(id);
  }

  async getTechnicians(): Promise<string[]> {
    this.checkConnection();
    return interventionOperations.getTechnicians();
  }

  async getClients(): Promise<string[]> {
    this.checkConnection();
    return interventionOperations.getClients();
  }

  // Méthodes pour les projets
  async getProjects(): Promise<Project[]> {
    this.checkConnection();
    return projectOperations.getAll();
  }
  
  async addProject(project: Omit<Project, "id">): Promise<Project> {
    this.checkConnection();
    return projectOperations.add(project);
  }
  
  async updateProject(id: number, project: Partial<Project>): Promise<Project | null> {
    this.checkConnection();
    return projectOperations.update(id, project);
  }
  
  async deleteProject(id: number): Promise<boolean> {
    this.checkConnection();
    return projectOperations.delete(id);
  }

  // Méthode utilitaire pour vérifier la connexion
  private checkConnection(): void {
    if (!this.connected) {
      throw new Error("Not connected to database");
    }
  }
}
