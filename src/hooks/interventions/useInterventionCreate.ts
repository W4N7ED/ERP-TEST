
import { Intervention } from "@/types/intervention";
import { useToast } from "@/hooks/use-toast";
import { getDatabaseInstance } from "@/services/database/databaseFactory";

/**
 * Hook pour la création d'interventions
 */
export const useInterventionCreate = () => {
  const { toast } = useToast();

  const handleCreateIntervention = async (newIntervention: Partial<Intervention>) => {
    if (!newIntervention.title || !newIntervention.client || !newIntervention.technician) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return { success: false, intervention: null };
    }

    try {
      const dbService = getDatabaseInstance();
      const intervention = await dbService.addIntervention({
        ...(newIntervention as Omit<Intervention, "id">),
        dateCreated: new Date().toISOString().split('T')[0],
        deadline: newIntervention.deadline || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });
      
      toast({
        title: "Intervention créée",
        description: `L'intervention #${intervention.id} a été créée avec succès`,
      });
      
      return { success: true, intervention };
    } catch (err) {
      console.error("Failed to create intervention:", err);
      toast({
        title: "Erreur",
        description: "Impossible de créer l'intervention. Veuillez réessayer.",
        variant: "destructive",
      });
      return { success: false, intervention: null };
    }
  };

  return { handleCreateIntervention };
};
