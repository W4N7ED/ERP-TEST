
import { DatabaseConfig, DatabaseService } from "./types";
import { Intervention } from "@/types/intervention";

// Base mock database service
export class MockDatabaseService implements DatabaseService {
  constructor(protected config: DatabaseConfig) {}

  async connect(): Promise<{ success: boolean; message: string }> {
    return { success: true, message: "Connected to mock database" };
  }

  async disconnect(): Promise<void> {}

  isConnected(): boolean {
    return true;
  }

  async getInterventions(): Promise<Intervention[]> {
    return [];
  }

  async addIntervention(intervention: Omit<Intervention, "id">): Promise<Intervention> {
    return { ...intervention, id: 1 };
  }

  async updateIntervention(id: number, intervention: Partial<Intervention>): Promise<Intervention | null> {
    return null;
  }

  async deleteIntervention(id: number): Promise<boolean> {
    return true;
  }

  async getTechnicians(): Promise<string[]> {
    return [];
  }

  async getClients(): Promise<string[]> {
    return [];
  }
}
