
import { useCallback } from "react";
import { ConfigurationState, AdminSetupResult } from "@/types/configuration";
import { mockOnlyDbService } from "@/services/database/MockOnlyDatabaseService";

export const useAdminAccount = (state: ConfigurationState, toast: any) => {
  const setupAdminAccount = useCallback(async (): Promise<AdminSetupResult> => {
    if (!state.createAdmin) {
      return { success: true };
    }

    try {
      // In the open-source version, we simulate admin account creation
      // by storing the credentials in localStorage
      
      // Store admin credentials for later authentication
      const adminCredentials = {
        email: state.adminEmail,
        password: state.adminPassword
      };
      
      localStorage.setItem("admin_credentials", JSON.stringify(adminCredentials));
      
      // Create an admin user in the mock database
      const adminUser = {
        id: "admin_user_id",
        email: state.adminEmail,
        name: state.adminName,
        role: "Administrateur",
        permissions: [
          "inventory.all", "suppliers.all", "projects.all", 
          "interventions.all", "quotes.all", "users.all"
        ],
        created_at: new Date().toISOString()
      };
      
      // Add the admin user to the mock database
      mockOnlyDbService.collection('users').add(adminUser);
      
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
