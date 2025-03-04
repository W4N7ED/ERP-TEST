
import { useCallback } from "react";
import { ConfigurationState } from "@/types/configuration";

export const useFormValidation = (state: ConfigurationState, toast: any) => {
  const validateForm = useCallback(() => {
    if (!state.appName) {
      toast({
        variant: "destructive",
        title: "Erreur de configuration",
        description: "Le nom de l'application est requis",
      });
      return false;
    }

    if (state.dbType !== "mock") {
      if (!state.host || !state.port || !state.username || !state.password || !state.database) {
        toast({
          variant: "destructive",
          title: "Erreur de configuration",
          description: "Tous les champs de connexion à la base de données sont requis",
        });
        return false;
      }
    }

    if (state.createAdmin) {
      if (!state.adminName || !state.adminEmail || !state.adminPassword) {
        toast({
          variant: "destructive",
          title: "Erreur de configuration",
          description: "Tous les champs pour le compte administrateur sont requis",
        });
        return false;
      }
    }

    return true;
  }, [state, toast]);

  return { validateForm };
};
