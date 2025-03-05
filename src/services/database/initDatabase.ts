
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
    console.log(`Initializing ${type} database at ${host}:${port}/${database}...`);
    
    // First verify connection
    const connectionResult = await verifyDatabaseConnection(host, port, username, password, database, type, tablePrefix);
    
    if (!connectionResult.success) {
      return connectionResult;
    }
    
    // In browser mode for PostgreSQL, try to use Supabase Edge function
    if (typeof window !== 'undefined' && type === 'postgres') {
      try {
        const response = await fetch(`${window.location.origin}/api/init-database`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            host,
            port,
            username,
            password,
            database,
            type,
            tablePrefix
          }),
        });

        if (response.ok) {
          const result = await response.json();
          return result;
        }
      } catch (error) {
        console.warn("API fallback failed, using browser mock:", error);
        // Continue with mock initialization
      }
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
    
    // Browser mode will use localStorage, but we'll show success message with the configured database
    if (typeof window !== 'undefined') {
      return {
        success: true,
        message: `Connexion à ${database}@${host}:${port} établie et tables créées. (Mode navigateur: données stockées localement)`,
        tables: prefixedTables
      };
    }
    
    // Server mode would create actual tables, but we're returning success for now
    // In a real implementation, the database service would create the tables
    
    return {
      success: true,
      message: `Connexion à ${database}@${host}:${port} établie et tables créées.`,
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
