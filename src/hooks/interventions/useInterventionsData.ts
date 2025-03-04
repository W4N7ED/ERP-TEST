import { useState, useEffect } from "react";
import { Intervention } from "@/types/intervention";
import { useToast } from "@/hooks/use-toast";
import { getDatabaseInstance } from "@/services/database/databaseFactory";

export const useInterventionsData = () => {
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [filteredInterventions, setFilteredInterventions] = useState<Intervention[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Load interventions from database
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
  }, [toast]);

  const handleCreateIntervention = async (newIntervention: Partial<Intervention>) => {
    if (!newIntervention.title || !newIntervention.client || !newIntervention.technician) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return false;
    }

    try {
      const dbService = getDatabaseInstance();
      const intervention = await dbService.addIntervention({
        ...(newIntervention as Omit<Intervention, "id">),
        dateCreated: new Date().toISOString().split('T')[0],
        deadline: newIntervention.deadline || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });

      setInterventions(prev => [...prev, intervention]);
      setFilteredInterventions(prev => [...prev, intervention]);
      
      toast({
        title: "Intervention créée",
        description: `L'intervention #${intervention.id} a été créée avec succès`,
      });
      
      return true;
    } catch (err) {
      console.error("Failed to create intervention:", err);
      toast({
        title: "Erreur",
        description: "Impossible de créer l'intervention. Veuillez réessayer.",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleUpdateIntervention = async (updatedIntervention: Partial<Intervention>) => {
    if (!updatedIntervention.id || !updatedIntervention.title || !updatedIntervention.client || !updatedIntervention.technician) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return false;
    }

    try {
      const dbService = getDatabaseInstance();
      const result = await dbService.updateIntervention(
        updatedIntervention.id, 
        updatedIntervention
      );
      
      if (!result) {
        toast({
          title: "Erreur",
          description: "Intervention non trouvée",
          variant: "destructive",
        });
        return false;
      }

      setInterventions(prev => 
        prev.map(item => item.id === updatedIntervention.id ? 
          { ...item, ...updatedIntervention } as Intervention : 
          item
        )
      );
      
      setFilteredInterventions(prev => 
        prev.map(item => item.id === updatedIntervention.id ? 
          { ...item, ...updatedIntervention } as Intervention : 
          item
        )
      );
      
      toast({
        title: "Intervention mise à jour",
        description: `L'intervention #${updatedIntervention.id} a été mise à jour`,
      });
      
      return true;
    } catch (err) {
      console.error("Failed to update intervention:", err);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'intervention. Veuillez réessayer.",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleArchiveIntervention = async (intervention: Intervention) => {
    if (window.confirm(`Êtes-vous sûr de vouloir archiver l'intervention "${intervention.title}" ?`)) {
      try {
        const dbService = getDatabaseInstance();
        const result = await dbService.updateIntervention(
          intervention.id, 
          { status: "Archivée", archived: true }
        );
        
        if (!result) {
          toast({
            title: "Erreur",
            description: "Intervention non trouvée",
            variant: "destructive",
          });
          return false;
        }

        setInterventions(prev => 
          prev.map(item => item.id === intervention.id ? 
            { ...item, status: "Archivée", archived: true } : 
            item
          )
        );
        
        setFilteredInterventions(prev => 
          prev.map(item => item.id === intervention.id ? 
            { ...item, status: "Archivée", archived: true } : 
            item
          )
        );
        
        toast({
          title: "Intervention archivée",
          description: `L'intervention #${intervention.id} a été archivée`,
        });
        
        return true;
      } catch (err) {
        console.error("Failed to archive intervention:", err);
        toast({
          title: "Erreur",
          description: "Impossible d'archiver l'intervention. Veuillez réessayer.",
          variant: "destructive",
        });
        return false;
      }
    }
    
    return false;
  };

  return {
    interventions,
    filteredInterventions,
    isLoading,
    error,
    setFilteredInterventions,
    handleCreateIntervention,
    handleUpdateIntervention,
    handleArchiveIntervention
  };
};
