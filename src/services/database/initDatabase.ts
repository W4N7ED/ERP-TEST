
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
