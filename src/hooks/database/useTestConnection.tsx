
import { useState } from "react";
import { toast } from "sonner";
import { ConnectionResult, ConnectionParams, getConnectionAdapter } from "./adapters/connectionAdapters";

export { type ConnectionResult } from "./adapters/connectionAdapters";

export const useTestConnection = () => {
  const [connectionResult, setConnectionResult] = useState<ConnectionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async (
    host: string,
    port: string,
    username: string,
    password: string,
    database: string,
    dbType: string
  ) => {
    setConnectionResult(null);
    setIsLoading(true);

    toast("Test de connexion: Tentative de connexion à la base de données...");

    try {
      // Get the appropriate adapter for the database type
      const connectionAdapter = getConnectionAdapter(dbType);
      
      // Prepare connection parameters
      const params: ConnectionParams = {
        host,
        port,
        username,
        password,
        database
      };
      
      // Use the adapter to test the connection
      const result = await connectionAdapter(params);
      
      console.log(`Résultat connexion ${dbType}:`, result);
      
      setConnectionResult(result);
      
      if (result.success) {
        toast.success("Connexion réussie: " + result.message);
      } else {
        toast.error("Échec de connexion: " + result.message);
      }
    } catch (error) {
      setConnectionResult({
        success: false,
        message: `Une erreur s'est produite: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
      });
      
      toast.error(`Une erreur s'est produite: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    connectionResult,
    isTestingConnection: isLoading,
    testConnection
  };
};
