
import { clientsList, interventionsMock, techniciansList } from "@/data/interventionsMock";
import { Intervention } from "@/types/intervention";
import { DatabaseConfig, DatabaseService } from "./types";

// Mock implementation for demonstration purposes
export class MockDatabaseService implements DatabaseService {
  private config: DatabaseConfig;
  private connected: boolean = false;
  private interventions: Intervention[] = [];

  constructor(config: DatabaseConfig) {
    this.config = config;
    // Initialize with mock data
    this.interventions = [...interventionsMock];
  }

  async connect(): Promise<{ success: boolean; message: string }> {
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (this.config.host && this.config.database) {
      this.connected = true;
      console.log(`Connected to ${this.config.type} database: ${this.config.database}`);
      return {
        success: true,
        message: `Connecté à ${this.config.database}@${this.config.host}:${this.config.port}`
      };
    } else {
      return {
        success: false,
        message: "Configuration de base de données invalide"
      };
    }
  }

  async disconnect(): Promise<void> {
    this.connected = false;
    console.log("Disconnected from database");
  }

  isConnected(): boolean {
    return this.connected;
  }

  async getInterventions(): Promise<Intervention[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.interventions;
  }

  async addIntervention(intervention: Omit<Intervention, "id">): Promise<Intervention> {
    // Generate a new ID
    const newId = Math.max(...this.interventions.map(i => i.id), 0) + 1;
    const newIntervention = { ...intervention, id: newId };
    this.interventions.push(newIntervention);
    return newIntervention;
  }

  async updateIntervention(id: number, intervention: Partial<Intervention>): Promise<Intervention | null> {
    const index = this.interventions.findIndex(i => i.id === id);
    if (index === -1) return null;
    
    this.interventions[index] = { ...this.interventions[index], ...intervention };
    return this.interventions[index];
  }

  async deleteIntervention(id: number): Promise<boolean> {
    const initialLength = this.interventions.length;
    this.interventions = this.interventions.filter(i => i.id !== id);
    return initialLength > this.interventions.length;
  }

  async getTechnicians(): Promise<string[]> {
    return techniciansList;
  }

  async getClients(): Promise<string[]> {
    return clientsList;
  }
}
