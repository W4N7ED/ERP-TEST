
import { useCallback } from "react";
import { ConfigurationState } from "@/types/configuration";
import { useToast } from "@/hooks/use-toast";
import { useAppName } from "@/components/AppNameProvider";

export const useConfigurationPersistence = (state: ConfigurationState, toast: any) => {
  const { setAppName } = useAppName();
  
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

    // Save to localStorage
    localStorage.setItem("app_config", JSON.stringify(configData));
    
    // Update application name
    setAppName(state.appName);
    
    toast({
      title: "Configuration sauvegardée",
      description: "La configuration de l'application a été enregistrée avec succès.",
    });

    return true;
  }, [state, toast, setAppName]);

  return { saveConfiguration };
};
