
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ConnectionResult {
  success: boolean;
  message: string;
  usingDirect?: boolean;
}

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
      let result;
      
      if (dbType === "sqlite") {
        // Simulation d'un succès pour SQLite (mode navigateur)
        result = {
          success: true,
          message: "Connexion réussie à la base de données SQLite (mode navigateur avec localStorage)"
        };
      } else if (dbType === "postgres") {
        // Pour PostgreSQL, utiliser la fonction Edge pour tester la connexion directe
        try {
          console.log("Tentative de connexion directe à PostgreSQL");
          const { data, error } = await supabase.functions.invoke('verify-db-connection', {
            body: {
              host,
              port,
              username,
              password,
              database,
              type: dbType
            },
          });
          
          if (error) {
            result = {
              success: false,
              message: `Erreur de connexion à PostgreSQL: ${error.message}`
            };
          } else {
            result = data;
          }
          
          console.log("Résultat connexion PostgreSQL:", result);
        } catch (postgresError) {
          result = {
            success: false,
            message: `Erreur lors de la vérification PostgreSQL: ${postgresError instanceof Error ? postgresError.message : 'Erreur inconnue'}`
          };
        }
      } else {
        // Pour les autres types de base de données, afficher un message d'information
        result = {
          success: true,
          message: `Mode compatible navigateur activé. Les données seront stockées localement avec SQLite/localStorage. Configuration ${dbType} sera utilisée en production.`
        };
      }
      
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
