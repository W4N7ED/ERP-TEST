import { clientsList, interventionsMock, techniciansList } from "@/data/interventionsMock";
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

// Mock implementation for demonstration purposes
class MockDatabaseService {
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

// MySQL-specific implementation
class MySQLDatabaseService extends MockDatabaseService {
  constructor(config: DatabaseConfig) {
    super(config);
    console.log("MySQL service initialized");
  }

  // Dans une implémentation réelle, on surchargerait les méthodes de MockDatabaseService
  // pour utiliser les connexions MySQL à la place des données mock
}

// Factory to create database service based on configuration
export function createDatabaseService(config: DatabaseConfig) {
  switch (config.type) {
    case "mysql":
      return new MySQLDatabaseService(config);
    case "postgres":
    case "sqlite":
      // For now, all use the mock implementation
      // In a real app, you would implement specific database services
      return new MockDatabaseService(config);
    case "mock":
    default:
      return new MockDatabaseService(config);
  }
}

// Verification function for database connection
export const verifyDatabaseConnection = async (
  host: string,
  port: string,
  username: string,
  password: string,
  database: string,
  type: DatabaseConfig["type"] = "mysql"
): Promise<{ success: boolean; message: string }> => {
  try {
    const dbService = createDatabaseService({
      host,
      port,
      username,
      password,
      database,
      type
    });
    
    return await dbService.connect();
  } catch (error) {
    console.error('Erreur lors de la vérification de connexion:', error);
    return {
      success: false,
      message: `Erreur de vérification: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
};

// Initialize database with required tables
export const initDatabase = async (
  host: string,
  port: string,
  username: string,
  password: string,
  database: string,
  type: DatabaseConfig["type"] = "mysql"
): Promise<{ success: boolean; message: string; tables?: string[] }> => {
  try {
    // First verify connection
    const connectionResult = await verifyDatabaseConnection(host, port, username, password, database, type);
    
    if (!connectionResult.success) {
      return connectionResult;
    }
    
    // Mock table creation
    const mockTables = [
      'users', 'inventory', 'suppliers', 'projects', 
      'interventions', 'movements', 'clients', 'quotes', 'quote_items'
    ];
    
    return {
      success: true,
      message: `Connexion à ${database}@${host}:${port} établie avec succès et tables créées.`,
      tables: mockTables
    };
  } catch (error) {
    console.error('Erreur d\'initialisation de la base de données:', error);
    return {
      success: false,
      message: `Erreur de connexion: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
};

// Create and export a default database instance based on localStorage configuration
let dbInstance: ReturnType<typeof createDatabaseService> | null = null;

export const getDatabaseInstance = () => {
  if (!dbInstance) {
    // Try to get config from localStorage
    const savedConfig = localStorage.getItem("app_config");
    
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        dbInstance = createDatabaseService({
          host: config.host || "localhost",
          port: config.port || "3306",
          username: config.username || "",
          password: config.password || "",
          database: config.database || "",
          type: config.type || "mock"
        });
        
        // Connect to database
        dbInstance.connect().then(result => {
          if (!result.success) {
            console.warn("Failed to connect to database:", result.message);
          }
        });
      } catch (error) {
        console.error("Failed to create database instance:", error);
        // Fall back to mock database
        dbInstance = createDatabaseService({
          host: "localhost",
          port: "3306",
          username: "user",
          password: "password",
          database: "mockdb",
          type: "mock"
        });
      }
    } else {
      // No saved config, use mock database
      dbInstance = createDatabaseService({
        host: "localhost",
        port: "3306",
        username: "user",
        password: "password",
        database: "mockdb",
        type: "mock"
      });
    }
  }
  
  return dbInstance;
};
