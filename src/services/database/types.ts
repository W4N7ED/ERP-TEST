
import { Intervention } from "@/types/intervention";
import { Project } from "@/types/project";

export interface DatabaseConfig {
  type: string;
  host?: string;
  port?: string;
  username?: string;
  password?: string;
  database?: string;
  tablePrefix?: string;
  useLocalStorage?: boolean;
}

export interface DatabaseService {
  connect(): Promise<{ success: boolean; message: string }>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  
  // Interventions
  getInterventions(): Promise<Intervention[]>;
  addIntervention(intervention: Omit<Intervention, "id">): Promise<Intervention>;
  updateIntervention(id: number, intervention: Partial<Intervention>): Promise<Intervention | null>;
  deleteIntervention(id: number): Promise<boolean>;
  getTechnicians(): Promise<string[]>;
  getClients(): Promise<string[]>;
  
  // Projects
  getProjects(): Promise<Project[]>;
  addProject(project: Omit<Project, "id">): Promise<Project>;
  updateProject(id: number, project: Partial<Project>): Promise<Project | null>;
  deleteProject(id: number): Promise<boolean>;
}
