
import { DatabaseConfig } from "./types";
import { createDatabaseService } from "./databaseFactory";

// Verification function for database connection
export const verifyDatabaseConnection = async (
  host: string,
  port: string,
  username: string,
  password: string,
  database: string,
  type: DatabaseConfig["type"] = "mysql",
  tablePrefix?: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const dbService = createDatabaseService({
      host,
      port,
      username,
      password,
      database,
      type,
      tablePrefix
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
