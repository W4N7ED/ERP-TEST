
import { DatabaseService } from "./types";
import { Intervention } from "@/types/intervention";
import { interventionsMock, techniciansList, clientsList } from "@/data/interventionsMock";

/**
 * Mock Database Service for development and testing
 */
export class MockDatabaseService implements DatabaseService {
  private connected: boolean = false;

  async connect(): Promise<{ success: boolean; message: string }> {
    this.connected = true;
    return { success: true, message: "Connected to mock database" };
  }

  async disconnect(): Promise<void> {
    this.connected = false;
  }

  isConnected(): boolean {
    return this.connected;
  }

  async getInterventions(): Promise<Intervention[]> {
    return [...interventionsMock];
  }

  async addIntervention(intervention: Omit<Intervention, "id">): Promise<Intervention> {
    const newId = interventionsMock.length ? Math.max(...interventionsMock.map(i => i.id)) + 1 : 1;
    const newIntervention = { ...intervention, id: newId } as Intervention;
    interventionsMock.push(newIntervention);
    return newIntervention;
  }

  async updateIntervention(id: number, intervention: Partial<Intervention>): Promise<Intervention | null> {
    const index = interventionsMock.findIndex(i => i.id === id);
    if (index === -1) return null;
    
    interventionsMock[index] = { ...interventionsMock[index], ...intervention };
    return interventionsMock[index];
  }

  async deleteIntervention(id: number): Promise<boolean> {
    const index = interventionsMock.findIndex(i => i.id === id);
    if (index === -1) return false;
    
    interventionsMock.splice(index, 1);
    return true;
  }

  async getTechnicians(): Promise<string[]> {
    return [...techniciansList];
  }

  async getClients(): Promise<string[]> {
    return [...clientsList];
  }
}
