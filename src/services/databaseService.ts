
import { supabase } from "@/integrations/supabase/client";

// Ce service gère les opérations de base de données à travers Supabase
// plutôt que les connexions pg directes depuis le navigateur

export const initDatabase = async (
  host: string,
  port: string,
  username: string,
  password: string,
  database: string
): Promise<{ success: boolean; message: string; tables?: string[] }> => {
  try {
    // Vérifier d'abord la connexion
    const connectionResult = await verifyDatabaseConnection(host, port, username, password, database);
    
    if (!connectionResult.success) {
      return connectionResult;
    }
    
    // Appeler la fonction supabase pour créer les tables
    const { data, error } = await supabase.functions.invoke('init-database', {
      body: { 
        host, 
        port, 
        username, 
        password, 
        database 
      }
    });
    
    if (error) {
      console.error('Erreur lors de l\'appel à la fonction d\'initialisation:', error);
      return {
        success: false,
        message: `Erreur d'initialisation: ${error.message}`
      };
    }
    
    return {
      success: true,
      message: data.message || `Connexion à ${database}@${host}:${port} établie avec succès et tables créées.`,
      tables: data.tables || []
    };
  } catch (error) {
    console.error('Erreur d\'initialisation de la base de données:', error);
    return {
      success: false,
      message: `Erreur de connexion: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
};

export const verifyDatabaseConnection = async (
  host: string,
  port: string,
  username: string,
  password: string,
  database: string
): Promise<{ success: boolean; message: string }> => {
  try {
    // Appeler la fonction Supabase pour vérifier la connexion
    const { data, error } = await supabase.functions.invoke('verify-db-connection', {
      body: { 
        host, 
        port, 
        username, 
        password, 
        database 
      }
    });
    
    if (error) {
      console.error('Erreur lors de la vérification de connexion:', error);
      return {
        success: false,
        message: `Erreur de vérification: ${error.message}`
      };
    }
    
    return {
      success: data.success,
      message: data.message
    };
  } catch (error) {
    console.error('Erreur lors de la vérification de connexion:', error);
    return {
      success: false,
      message: `Erreur de vérification: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
};
