
import { useCallback } from "react";
import { ConfigurationState } from "@/types/configuration";
import { useToast } from "@/hooks/use-toast";

export const useConfigurationPersistence = (state: ConfigurationState, toast: any) => {
  const saveConfiguration = useCallback(() => {
    const configData = {
      appName: state.appName,
      host: state.host,
      port: state.port,
      username: state.username,
      password: state.password,
      database: state.database,
      dbType: state.dbType,
      tablePrefix: state.tablePrefix,
      isConfigured: true,
      configuredAt: new Date().toISOString(),
      adminConfig: {
        name: state.adminName,
        email: state.adminEmail,
        password: state.adminPassword,
        createAdmin: state.createAdmin
      },
      notes: state.notes
    };

    localStorage.setItem("app_config", JSON.stringify(configData));
    
    toast({
      title: "Configuration sauvegardée",
      description: "La configuration de l'application a été enregistrée avec succès.",
    });

    return true;
  }, [state, toast]);

  return { saveConfiguration };
};
