import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getDatabaseInstance } from "@/services/database/databaseFactory";

/**
 * Hook pour récupérer les interventions depuis la base de données
 */
export const useFetchInterventions = (
  setInterventions: (interventions: any[]) => void,
  setFilteredInterventions: (interventions: any[]) => void,
  setIsLoading: (isLoading: boolean) => void,
  setError: (error: string | null) => void
) => {
  const { toast } = useToast();

  useEffect(() => {
    const fetchInterventions = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const dbService = getDatabaseInstance();
        const data = await dbService.getInterventions();
        setInterventions(data);
        setFilteredInterventions(data);
      } catch (err) {
        console.error("Failed to fetch interventions:", err);
        setError(err instanceof Error ? err.message : "Failed to load interventions");
        toast({
          title: "Erreur",
          description: "Impossible de charger les interventions. Veuillez réessayer.",
          variant: "destructive",
        });
        // Fallback to empty array
        setInterventions([]);
        setFilteredInterventions([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Only try to fetch if database is configured
    try {
      fetchInterventions();
    } catch (err) {
      console.warn("Database not initialized yet:", err);
      // Keep empty state until database is configured
    }
  }, [toast, setInterventions, setFilteredInterventions, setIsLoading, setError]);
};
