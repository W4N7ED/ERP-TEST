
import { DatabaseConfig, DatabaseService } from "./types";
import { Intervention } from "@/types/intervention";

// A minimal implementation to fix build errors
// This should be replaced with real database implementations in production
export class MockOnlyDatabaseService implements DatabaseService {
  private collections: Record<string, any[]> = {};
  
  constructor(private config: DatabaseConfig) {
    this.collections = {
      users: [],
      inventory: [],
      suppliers: [],
      projects: [],
      interventions: [],
      quotes: []
    };
  }

  async connect(): Promise<{ success: boolean; message: string }> {
    return { success: true, message: "Connected to mock database (for development only)" };
  }

  async disconnect(): Promise<void> {
    // No real connection to close
  }

  isConnected(): boolean {
    return true;
  }

  async getInterventions(): Promise<Intervention[]> {
    return this.collections.interventions as Intervention[];
  }

  async addIntervention(intervention: Omit<Intervention, "id">): Promise<Intervention> {
    const newId = this.collections.interventions.length + 1;
    const newIntervention = { ...intervention, id: newId };
    this.collections.interventions.push(newIntervention);
    return newIntervention;
  }

  async updateIntervention(id: number, intervention: Partial<Intervention>): Promise<Intervention | null> {
    const index = this.collections.interventions.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    this.collections.interventions[index] = {
      ...this.collections.interventions[index],
      ...intervention
    };
    
    return this.collections.interventions[index];
  }

  async deleteIntervention(id: number): Promise<boolean> {
    const initialLength = this.collections.interventions.length;
    this.collections.interventions = this.collections.interventions.filter(item => item.id !== id);
    return initialLength > this.collections.interventions.length;
  }

  async getTechnicians(): Promise<string[]> {
    return ["Technicien 1", "Technicien 2"];
  }

  async getClients(): Promise<string[]> {
    return ["Client 1", "Client 2"];
  }

  // Collection helper methods for development
  collection(name: string) {
    if (!this.collections[name]) {
      this.collections[name] = [];
    }
    
    return {
      add: (item: any) => {
        const id = Math.random().toString(36).substring(2, 9);
        const itemWithId = { ...item, id };
        this.collections[name].push(itemWithId);
        return itemWithId;
      },
      get: () => this.collections[name],
      find: (predicate: (item: any) => boolean) => {
        return this.collections[name].find(predicate);
      }
    };
  }

  // Method to initialize with sample data (used in development)
  initializeWithSampleData() {
    // Add minimal sample data here
    // This is just for development purposes
    this.collections.users = [
      {
        id: "admin_user_id",
        email: "admin@example.com",
        name: "Administrator",
        role: "Administrateur",
        permissions: ["inventory.all", "suppliers.all", "projects.all", "users.all"],
        created_at: new Date().toISOString()
      }
    ];
  }
}

// Export singleton instance for legacy code
export const mockOnlyDbService = new MockOnlyDatabaseService({
  host: "localhost",
  port: "5432",
  username: "mock",
  password: "mock",
  database: "mock",
  type: "mock"
});
