
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ConfigurationState } from "@/types/configuration";
import { useFormValidation } from "@/hooks/configuration/useFormValidation";
import { useAdminAccount } from "@/hooks/configuration/useAdminAccount";
import { useDatabaseSetup } from "@/hooks/configuration/useDatabaseSetup";
import { useConfigurationFields } from "@/hooks/configuration/useConfigurationFields";
import { useConfigurationPersistence } from "@/hooks/configuration/useConfigurationPersistence";

export type { ConfigurationState };

export const useConfigurationState = () => {
  const configFields = useConfigurationFields();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const { validateForm } = useFormValidation(configFields, toast);
  const { setupAdminAccount } = useAdminAccount(configFields, toast);
  const { initializeDatabase } = useDatabaseSetup(configFields, toast);
  const { saveConfiguration } = useConfigurationPersistence(configFields, toast);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    configFields.updateField('isInitializing', true);
    
    try {
      // Initialize the database first
      const initResult = await initializeDatabase();
      if (!initResult.success) {
        toast({
          variant: "destructive",
          title: "Erreur d'initialisation",
          description: "L'initialisation de la base de données a échoué. Veuillez vérifier vos paramètres.",
        });
        configFields.updateField('isInitializing', false);
        return;
      }

      // Set up admin account if requested
      if (configFields.createAdmin) {
        const adminSetupResult = await setupAdminAccount();
        if (!adminSetupResult.success) {
          toast({
            variant: "destructive",
            title: "Erreur de configuration",
            description: "La création du compte administrateur a échoué.",
          });
          configFields.updateField('isInitializing', false);
          return;
        }
      }

      // Save configuration to localStorage
      saveConfiguration();
      
      toast({
        title: "Configuration terminée",
        description: "L'application est maintenant configurée et prête à l'emploi.",
      });
      
      // Navigate to login page
      navigate("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur d'initialisation",
        description: `Une erreur s'est produite lors de l'initialisation: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      });
    } finally {
      configFields.updateField('isInitializing', false);
    }
  };

  return {
    ...configFields,
    handleSubmit
  };
};
