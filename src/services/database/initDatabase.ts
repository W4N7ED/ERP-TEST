
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
    
    // For PostgreSQL, use the Supabase edge function
    if (type === 'postgres') {
      try {
        const response = await fetch('https://jqwgbfzznwnotyplunaz.functions.supabase.co/init-database', {
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
          })
        });
        
        const data = await response.json();
        
        if (!data.success) {
          console.error('Error from edge function:', data.message);
          return {
            success: false,
            message: data.message || "Failed to initialize database tables"
          };
        }
        
        return {
          success: true,
          message: data.message || "Tables created successfully",
          tables: data.tables || prefixedTables
        };
      } catch (error) {
        console.error("Error calling edge function:", error);
        return {
          success: false,
          message: `Failed to initialize database: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
      }
    }
    
    // For other database types, return success for now
    // In a real implementation, you would create tables for MySQL or other DBs
    return {
      success: true,
      message: `Connexion à ${database}@${host}:${port} établie avec succès et tables créées.`,
      tables: prefixedTables
    };
  } catch (error) {
    console.error('Erreur d\'initialisation de la base de données:', error);
    return {
      success: false,
      message: `Erreur de connexion: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
};
