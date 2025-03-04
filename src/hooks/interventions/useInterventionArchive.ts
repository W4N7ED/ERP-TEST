
import { Intervention } from "@/types/intervention";
import { useToast } from "@/hooks/use-toast";
import { getDatabaseInstance } from "@/services/database/databaseFactory";

/**
 * Hook pour l'archivage d'interventions
 */
export const useInterventionArchive = () => {
  const { toast } = useToast();

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
          return { success: false, intervention: null };
        }

        toast({
          title: "Intervention archivée",
          description: `L'intervention #${intervention.id} a été archivée`,
        });
        
        return { success: true, intervention: result };
      } catch (err) {
        console.error("Failed to archive intervention:", err);
        toast({
          title: "Erreur",
          description: "Impossible d'archiver l'intervention. Veuillez réessayer.",
          variant: "destructive",
        });
        return { success: false, intervention: null };
      }
    }
    
    return { success: false, intervention: null };
  };

  return { handleArchiveIntervention };
};
