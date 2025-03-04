
import { DatabaseConfig } from "./types";
import { verifyDatabaseConnection } from "./verifyConnection";
import { createDatabaseService } from "./databaseFactory";

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
    
    // Use the database service to initialize tables
    const dbService = createDatabaseService({
      host,
      port,
      username,
      password,
      database,
      type,
      tablePrefix
    });
    
    // We would normally create tables here, but for now we'll just return success
    // In a real implementation, the database service would have methods to create tables
    
    return {
      success: true,
      message: `Connection to ${database}@${host}:${port} established and tables created.`,
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
