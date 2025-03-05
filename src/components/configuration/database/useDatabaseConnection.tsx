
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { storageService } from "@/services/storageService";
import { verifyDatabaseConnection } from "@/services/database/verifyConnection";
import { initDatabase } from "@/services/database/initDatabase";

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
  const [isLoading, setIsLoading] = useState<{ testing: boolean; initializing: boolean }>({
    testing: false,
    initializing: false
  });
  const { toast } = useToast();

  const testConnection = async () => {
    setConnectionResult(null);
    setIsLoading(prev => ({ ...prev, testing: true }));

    toast({
      title: "Test de connexion",
      description: "Tentative de connexion à la base de données...",
    });

    try {
      let result;
      
      if (dbType === "sqlite") {
        // Simulation d'un succès pour SQLite (toujours en mode navigateur)
        result = {
          success: true,
          message: "Connexion réussie à la base de données SQLite (mode navigateur avec localStorage)"
        };
      } else {
        // Pour PostgreSQL et MySQL, essayer une vraie connexion
        result = await verifyDatabaseConnection(
          host, 
          port, 
          username, 
          password, 
          database, 
          dbType as any, 
          tablePrefix
        );
      }
      
      setConnectionResult(result);
      
      if (result.success) {
        toast({
          title: "Connexion réussie",
          description: result.message,
        });
        
        // Sauvegarder la configuration de la base de données
        storageService.saveData("db_config", {
          host,
          port,
          username,
          password,
          database,
          dbType,
          tablePrefix
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
    } finally {
      setIsLoading(prev => ({ ...prev, testing: false }));
    }
  };

  const initializeDatabase = async () => {
    setInitResult(null);
    setIsLoading(prev => ({ ...prev, initializing: true }));

    toast({
      title: "Initialisation en cours",
      description: "Création des tables dans la base de données...",
    });

    try {
      // Pour PostgreSQL et MySQL, essayer une vraie initialisation
      const result = await initDatabase(
        host, 
        port, 
        username, 
        password, 
        database, 
        dbType as any, 
        tablePrefix
      );
      
      // Pour le mode navigateur, initialiser des données locales
      if (typeof window !== 'undefined') {
        if (!storageService.getData(database || "app_db")) {
          // Initialiser des tableaux vides pour les projets et interventions
          storageService.saveData(database || "app_db", {
            projects: [],
            interventions: []
          });
        }
      }
      
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
      console.error("Error initializing database:", error);
      setInitResult({
        success: false,
        message: `Une erreur s'est produite: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
      });
      
      toast({
        variant: "destructive",
        title: "Erreur",
        description: `Une erreur s'est produite: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      });
    } finally {
      setIsLoading(prev => ({ ...prev, initializing: false }));
    }
  };

  return {
    connectionResult,
    initResult,
    isLoading,
    testConnection,
    initializeDatabase
  };
};
