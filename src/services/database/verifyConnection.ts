
import { DatabaseConfig } from "./types";
import { ConnectionResult, getConnectionAdapter } from "../../hooks/database/adapters/connectionAdapters";

// Fonction principale pour vérifier la connexion à la base de données
export const verifyDatabaseConnection = async (
  host: string,
  port: string,
  username: string,
  password: string,
  database: string,
  type: DatabaseConfig["type"] = "mysql",
  tablePrefix: string = ""
): Promise<ConnectionResult> => {
  try {
    console.log(`Vérification de la connexion à ${type}:${host}:${port}/${database}`);
    
    // Utiliser l'adaptateur approprié pour le type de base de données
    const connectionAdapter = getConnectionAdapter(type);
    
    // Paramètres de connexion
    const params = {
      host,
      port,
      username,
      password,
      database
    };
    
    // Tester la connexion
    const result = await connectionAdapter(params);
    
    return result;
  } catch (error) {
    console.error('Erreur lors de la vérification de la connexion:', error);
    return {
      success: false,
      message: `Erreur de connexion: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
};

// Fonction pour vérifier les connexions externes (API)
export const verifyExternalConnection = async (params: any) => {
  try {
    // Utiliser un proxy pour éviter les problèmes CORS
    const response = await fetch('/lovable-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur de vérification de connexion externe:", error);
    throw error;
  }
};
