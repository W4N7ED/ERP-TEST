
import { useCallback } from "react";
import { usePermissions } from "@/hooks/usePermissions";
import { ConfigurationState, AdminSetupResult } from "@/types/configuration";

export const useAdminAccount = (state: ConfigurationState, toast: any) => {
  const { addUser } = usePermissions();

  const setupAdminAccount = useCallback(async (): Promise<AdminSetupResult> => {
    try {
      addUser({
        name: state.adminName,
        role: "Administrateur",
        permissions: [
          'inventory.view', 'inventory.add', 'inventory.edit', 'inventory.delete', 'inventory.export', 'inventory.import',
          'suppliers.view', 'suppliers.add', 'suppliers.edit', 'suppliers.delete',
          'movements.view', 'movements.add', 'movements.approve',
          'projects.view', 'projects.add', 'projects.edit', 'projects.delete', 'projects.archive',
          'interventions.view', 'interventions.add', 'interventions.edit', 'interventions.delete', 'interventions.archive',
          'users.view', 'users.add', 'users.edit', 'users.delete',
          'quotes.view', 'quotes.add', 'quotes.edit', 'quotes.delete', 'quotes.approve',
          'clients.view', 'clients.add', 'clients.edit', 'clients.delete'
        ]
      });
      
      localStorage.setItem("admin_credentials", JSON.stringify({
        email: state.adminEmail,
        password: state.adminPassword
      }));
      
      toast({
        title: "Compte administrateur créé",
        description: `Administrateur '${state.adminName}' créé avec succès`
      });
      
      return { success: true };
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de création",
        description: "Impossible de créer le compte administrateur"
      });
      return { 
        success: false,
        message: error instanceof Error ? error.message : "Erreur inconnue"
      };
    }
  }, [state, addUser, toast]);

  return { setupAdminAccount };
};
