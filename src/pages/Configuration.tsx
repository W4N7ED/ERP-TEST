
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfigurationForm } from '@/components/configuration/ConfigurationForm';
import { useConfigurationState } from '@/hooks/useConfigurationState';

const Configuration = () => {
  const navigate = useNavigate();
  const configState = useConfigurationState();
  const [isAlreadyConfigured, setIsAlreadyConfigured] = useState(false);

  useEffect(() => {
    // Check if app is already configured
    const config = localStorage.getItem("app_config");
    if (config) {
      try {
        const parsedConfig = JSON.parse(config);
        if (parsedConfig.isConfigured) {
          setIsAlreadyConfigured(true);
        }
      } catch (error) {
        console.error("Error parsing app configuration:", error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-background py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Configuration de l'application</h1>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {isAlreadyConfigured ? (
          <div className="text-center space-y-4 max-w-lg mx-auto my-10 p-6 border rounded-lg shadow">
            <h2 className="text-xl font-semibold">Application déjà configurée</h2>
            <p>L'application a déjà été configurée. Vous pouvez vous connecter ou réinitialiser la configuration.</p>
            <div className="flex flex-col space-y-2">
              <button 
                onClick={() => navigate('/login')} 
                className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
              >
                Connexion
              </button>
              <button 
                onClick={() => {
                  if (window.confirm("Êtes-vous sûr de vouloir réinitialiser la configuration? Toutes les données locales seront perdues.")) {
                    localStorage.removeItem("app_config");
                    setIsAlreadyConfigured(false);
                  }
                }} 
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90"
              >
                Réinitialiser la configuration
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 space-y-2">
              <h2 className="text-xl font-semibold">Configuration initiale</h2>
              <p className="text-muted-foreground">
                Configurez votre application pour qu'elle fonctionne selon vos besoins.
                Vous pourrez modifier ces paramètres ultérieurement.
              </p>
            </div>
            
            <ConfigurationForm {...configState} />
          </div>
        )}
      </main>
      
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <p>Version open-source - {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Configuration;
