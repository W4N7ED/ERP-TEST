
import { useToast } from "@/hooks/use-toast";

export const useInterventionNavigation = () => {
  const { toast } = useToast();

  const linkToProject = (projectId: number) => {
    toast({
      title: "Navigation vers le projet",
      description: `Redirection vers le projet #${projectId}`,
    });
  };

  return {
    linkToProject
  };
};
