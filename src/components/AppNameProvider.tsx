
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

type AppNameContextType = {
  appName: string;
  setAppName: (name: string) => void;
};

const AppNameContext = createContext<AppNameContextType | undefined>(undefined);

export function AppNameProvider({ children }: { children: ReactNode }) {
  const [appName, setAppName] = useState<string>(() => {
    // Try to get the app name from localStorage
    const config = localStorage.getItem("app_config");
    if (config) {
      try {
        const parsedConfig = JSON.parse(config);
        if (parsedConfig.appName) {
          return parsedConfig.appName;
        }
      } catch (error) {
        console.error("Error parsing app configuration:", error);
      }
    }
    // Default name if not found
    return "EDR Solution";
  });

  // Save app name to localStorage when it changes
  const updateAppName = (newName: string) => {
    setAppName(newName);
    
    // Update in localStorage
    const config = localStorage.getItem("app_config");
    if (config) {
      try {
        const parsedConfig = JSON.parse(config);
        parsedConfig.appName = newName;
        localStorage.setItem("app_config", JSON.stringify(parsedConfig));
      } catch (error) {
        console.error("Error updating app configuration:", error);
      }
    } else {
      // If no config exists yet, create a minimal one
      const newConfig = { appName: newName };
      localStorage.setItem("app_config", JSON.stringify(newConfig));
    }
  };
  
  return (
    <AppNameContext.Provider value={{ appName, setAppName: updateAppName }}>
      {children}
    </AppNameContext.Provider>
  );
}

export function useAppName() {
  const context = useContext(AppNameContext);
  
  if (context === undefined) {
    throw new Error('useAppName must be used within an AppNameProvider');
  }
  
  return context;
}
