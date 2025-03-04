
import { DatabaseConfig } from "./types";
import { verifyDatabaseConnection } from "./verifyConnection";

// Initialize database with required tables
export const initDatabase = async (
  host: string,
  port: string,
  username: string,
  password: string,
  database: string,
  type: DatabaseConfig["type"] = "mysql",
  tablePrefix: string = ""
): Promise<{ success: boolean; message: string; tables?: string[] }> => {
  try {
    // First verify connection
    const connectionResult = await verifyDatabaseConnection(host, port, username, password, database, type, tablePrefix);
    
    if (!connectionResult.success) {
      return connectionResult;
    }
    
    // Generate table names with prefix
    const baseTableNames = [
      'users', 'inventory', 'suppliers', 'projects', 
      'interventions', 'movements', 'clients', 'quotes', 'quote_items'
    ];
    
    const prefixedTables = baseTableNames.map(table => 
      tablePrefix ? `${tablePrefix}${table}` : table
    );
    
    // For mock database, always return success
    if (type === 'mock') {
      return {
        success: true,
        message: `Mock database initialized successfully.`,
        tables: prefixedTables
      };
    }
    
    // For all database types in offline mode, simulate success
    console.log(`Simulating database initialization for ${type} database at ${host}:${port}/${database}`);
    
    return {
      success: true,
      message: `Simulated connection to ${database}@${host}:${port} established and tables created.`,
      tables: prefixedTables
    };
  } catch (error) {
    console.error('Error initializing database:', error);
    return {
      success: false,
      message: `Initialization error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};
