
import { Intervention } from "@/types/intervention";
import { Project } from "@/types/project";

// Generic database configuration interface
export interface DatabaseConfig {
  type: "mysql" | "postgres" | "sqlite";
  database: string;
  // Ces champs sont nécessaires pour MySQL et PostgreSQL, mais pas pour SQLite
  host?: string;
  port?: string; // String to match the form input
  username?: string;
  password?: string;
  tablePrefix?: string;
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
  
  // Project methods
  getProjects(): Promise<Project[]>;
  addProject(project: Omit<Project, "id">): Promise<Project>;
  updateProject(id: number, project: Partial<Project>): Promise<Project | null>;
  deleteProject(id: number): Promise<boolean>;
}
