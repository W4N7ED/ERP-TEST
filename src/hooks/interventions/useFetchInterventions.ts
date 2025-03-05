import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getDatabaseInstance } from "@/services/database/databaseFactory";
import { shouldUseMockData } from "@/utils/databaseCheck";
import { interventionsMock } from "@/data/interventionsMock";

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
        
        // Use the data from the database or fallback to mock data if necessary
        if (data.length > 0 || !shouldUseMockData()) {
          setInterventions(data);
          setFilteredInterventions(data);
        } else {
          // Only use mock data if we should be using it
          console.log("No interventions found in database, using mock data");
          setInterventions(interventionsMock);
          setFilteredInterventions(interventionsMock);
        }
      } catch (err) {
        console.error("Failed to fetch interventions:", err);
        setError(err instanceof Error ? err.message : "Failed to load interventions");
        
        toast({
          title: "Erreur",
          description: "Impossible de charger les interventions. Veuillez réessayer.",
          variant: "destructive",
        });
        
        // Only use mock data as fallback if we're in mock mode
        if (shouldUseMockData()) {
          console.log("Using mock data as fallback");
          setInterventions(interventionsMock);
          setFilteredInterventions(interventionsMock);
        } else {
          // Otherwise use empty array
          setInterventions([]);
          setFilteredInterventions([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Only try to fetch if database is configured
    try {
      fetchInterventions();
    } catch (err) {
      console.warn("Database not initialized yet:", err);
      
      // Only use mock data if we should be using it
      if (shouldUseMockData()) {
        setInterventions(interventionsMock);
        setFilteredInterventions(interventionsMock);
      } else {
        setInterventions([]);
        setFilteredInterventions([]);
      }
      
      setIsLoading(false);
    }
  }, [toast, setInterventions, setFilteredInterventions, setIsLoading, setError]);
};
