
import { Intervention } from "@/types/intervention";

// Generic database configuration interface
export interface DatabaseConfig {
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
  type: "mysql" | "postgres" | "sqlite" | "mock";
}

// Database service interface
export interface DatabaseService {
  connect(): Promise<{ success: boolean; message: string }>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  getInterventions(): Promise<Intervention[]>;
  addIntervention(intervention: Omit<Intervention, "id">): Promise<Intervention>;
  updateIntervention(id: number, intervention: Partial<Intervention>): Promise<Intervention | null>;
  deleteIntervention(id: number): Promise<boolean>;
  getTechnicians(): Promise<string[]>;
  getClients(): Promise<string[]>;
}
