
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { verifyDatabaseConnection, initDatabase } from "@/services/databaseService";

export const useDatabaseConnection = (
  host: string,
  port: string,
  username: string,
  password: string,
  database: string,
  dbType: string,
  tablePrefix: string
) => {
  const [connectionResult, setConnectionResult] = useState<{ success: boolean; message: string } | null>(null);
  const [initResult, setInitResult] = useState<{ success: boolean; message: string; tables?: string[] } | null>(null);
  const { toast } = useToast();

  const testConnection = async () => {
    setConnectionResult(null);

    toast({
      title: "Test de connexion",
      description: "Tentative de connexion à la base de données...",
    });

    try {
      // Use the verification service
      const result = await verifyDatabaseConnection(
        host, 
        port, 
        username, 
        password, 
        database, 
        dbType as any
      );
      
      setConnectionResult(result);
      
      if (result.success) {
        toast({
          title: "Connexion réussie",
          description: result.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Échec de connexion",
          description: result.message,
        });
      }
    } catch (error) {
      setConnectionResult({
        success: false,
        message: `Une erreur s'est produite: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
      });
      
      toast({
        variant: "destructive",
        title: "Erreur",
        description: `Une erreur s'est produite: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      });
    }
  };

  const initializeDatabase = async () => {
    setInitResult(null);

    toast({
      title: "Initialisation en cours",
      description: "Création des tables dans la base de données...",
    });

    try {
      // Initialize the database
      const result = await initDatabase(
        host, 
        port, 
        username, 
        password, 
        database, 
        dbType as any,
        tablePrefix
      );
      
      setInitResult(result);
      
      if (result.success) {
        toast({
          title: "Initialisation réussie",
          description: "Les tables ont été créées avec succès",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Échec de l'initialisation",
          description: result.message,
        });
      }
    } catch (error) {
      setInitResult({
        success: false,
        message: `Une erreur s'est produite: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
      });
      
      toast({
        variant: "destructive",
        title: "Erreur",
        description: `Une erreur s'est produite: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      });
    }
  };

  return {
    connectionResult,
    initResult,
    testConnection,
    initializeDatabase
  };
};
