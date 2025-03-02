
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import LanguageSelector from './LanguageSelector';
import ThemeSelector from './ThemeSelector';
import DarkModeToggle from './DarkModeToggle';

interface DisplayPreferencesCardProps {
  onSave?: () => void;
}

const DisplayPreferencesCard: React.FC<DisplayPreferencesCardProps> = ({ onSave }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("fr");
  const [theme, setTheme] = useState<string>("system");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [compactMode, setCompactMode] = useState<boolean>(false);
  
  // Check if dark mode is active initially
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setDarkMode(isDarkMode);
  }, []);
  
  const toggleDarkMode = (enabled: boolean) => {
    setDarkMode(enabled);
    if (enabled) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    toast.success(`Mode ${enabled ? 'sombre' : 'clair'} activé`);
  };
  
  const handleSaveDisplaySettings = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Préférences d'affichage mises à jour");
      if (onSave) onSave();
    }, 1000);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences d'affichage</CardTitle>
        <CardDescription>
          Personnalisez l'apparence de l'application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <LanguageSelector language={language} setLanguage={setLanguage} />
          
          <ThemeSelector theme={theme} setTheme={setTheme} />
          
          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          
          <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="compact-mode">Mode compact</Label>
              <p className="text-sm text-muted-foreground">
                Réduit l'espacement pour afficher plus d'informations à l'écran
              </p>
            </div>
            <Switch 
              id="compact-mode" 
              checked={compactMode} 
              onCheckedChange={setCompactMode} 
            />
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleSaveDisplaySettings} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enregistrer les préférences
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DisplayPreferencesCard;
