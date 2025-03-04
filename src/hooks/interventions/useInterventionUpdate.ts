
import { Intervention } from "@/types/intervention";
import { useToast } from "@/hooks/use-toast";
import { getDatabaseInstance } from "@/services/database/databaseFactory";

/**
 * Hook pour la mise à jour d'interventions
 */
export const useInterventionUpdate = () => {
  const { toast } = useToast();

  const handleUpdateIntervention = async (updatedIntervention: Partial<Intervention>) => {
    if (!updatedIntervention.id || !updatedIntervention.title || !updatedIntervention.client || !updatedIntervention.technician) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return { success: false, intervention: null };
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
        return { success: false, intervention: null };
      }

      toast({
        title: "Intervention mise à jour",
        description: `L'intervention #${updatedIntervention.id} a été mise à jour`,
      });
      
      return { success: true, intervention: result };
    } catch (err) {
      console.error("Failed to update intervention:", err);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'intervention. Veuillez réessayer.",
        variant: "destructive",
      });
      return { success: false, intervention: null };
    }
  };

  return { handleUpdateIntervention };
};
