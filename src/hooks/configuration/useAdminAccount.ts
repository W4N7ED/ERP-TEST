
import { useCallback } from "react";
import { ConfigurationState, AdminSetupResult } from "@/types/configuration";

export const useAdminAccount = (state: ConfigurationState, toast: any) => {
  const setupAdminAccount = useCallback(async (): Promise<AdminSetupResult> => {
    if (!state.createAdmin) {
      return { success: true };
    }

    try {
      // Store admin credentials for later authentication
      const adminCredentials = {
        email: state.adminEmail,
        password: state.adminPassword
      };
      
      localStorage.setItem("admin_credentials", JSON.stringify(adminCredentials));
      
      toast({
        title: "Compte administrateur créé",
        description: `${state.adminName} (${state.adminEmail}) a été créé avec succès`,
      });
      
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur inconnue";
      toast({
        variant: "destructive",
        title: "Erreur de création du compte administrateur",
        description: message,
      });
      return { success: false, message };
    }
  }, [state, toast]);

  return { setupAdminAccount };
};
