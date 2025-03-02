
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, Moon, Sun, Bell, Monitor } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import IntegrationsCard from './integrations/IntegrationsCard';

const ProfileDisplay: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("fr");
  const [theme, setTheme] = useState<string>("system");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [compactMode, setCompactMode] = useState<boolean>(false);
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [pushNotifications, setPushNotifications] = useState<boolean>(true);
  const [notificationSettings, setNotificationSettings] = useState({
    interventions: true,
    tasks: true,
    quotes: true
  });
  
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
    }, 1000);
  };
  
  const handleSaveNotificationSettings = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Préférences de notifications mises à jour");
    }, 1000);
  };
  
  const handleNotificationSettingChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Préférences d'affichage</CardTitle>
          <CardDescription>
            Personnalisez l'apparence de l'application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Langue</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une langue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="theme">Thème</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  type="button" 
                  variant={theme === "light" ? "default" : "outline"}
                  onClick={() => setTheme("light")}
                  className="w-full justify-start"
                >
                  <Sun className="h-4 w-4 mr-2" />
                  Clair
                </Button>
                <Button 
                  type="button" 
                  variant={theme === "dark" ? "default" : "outline"}
                  onClick={() => setTheme("dark")}
                  className="w-full justify-start"
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Sombre
                </Button>
                <Button 
                  type="button" 
                  variant={theme === "system" ? "default" : "outline"}
                  onClick={() => setTheme("system")}
                  className="w-full justify-start"
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  Système
                </Button>
              </div>
            </div>
            
            <IntegrationsCard 
              title="Mode sombre" 
              description="Basculer entre les thèmes clair et sombre" 
              className="border-dashed"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sun className="h-5 w-5 text-amber-500" />
                  <Moon className="h-5 w-5 text-indigo-400" />
                </div>
                <Switch 
                  checked={darkMode} 
                  onCheckedChange={toggleDarkMode}
                />
              </div>
            </IntegrationsCard>
            
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
      
      <Card>
        <CardHeader>
          <CardTitle>Préférences de notifications</CardTitle>
          <CardDescription>
            Gérez comment et quand vous recevez des notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-md font-medium">Canaux de notification</h3>
              
              <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notif">Notifications par email</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevez des notifications par email
                  </p>
                </div>
                <Switch 
                  id="email-notif" 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications} 
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notif">Notifications push</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevez des notifications sur votre appareil
                  </p>
                </div>
                <Switch 
                  id="push-notif" 
                  checked={pushNotifications} 
                  onCheckedChange={setPushNotifications} 
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-md font-medium">Types de notifications</h3>
              
              <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="interventions-notif">Mises à jour des interventions</Label>
                  <p className="text-sm text-muted-foreground">
                    Soyez notifié des nouvelles interventions et mises à jour
                  </p>
                </div>
                <Switch 
                  id="interventions-notif" 
                  checked={notificationSettings.interventions} 
                  onCheckedChange={() => handleNotificationSettingChange('interventions')} 
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="tasks-notif">Rappels de tâches</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevez des rappels pour vos tâches et projets
                  </p>
                </div>
                <Switch 
                  id="tasks-notif" 
                  checked={notificationSettings.tasks} 
                  onCheckedChange={() => handleNotificationSettingChange('tasks')} 
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="quotes-notif">Suivi des devis et factures</Label>
                  <p className="text-sm text-muted-foreground">
                    Soyez notifié des mises à jour de devis et factures
                  </p>
                </div>
                <Switch 
                  id="quotes-notif" 
                  checked={notificationSettings.quotes} 
                  onCheckedChange={() => handleNotificationSettingChange('quotes')} 
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleSaveNotificationSettings} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enregistrer les préférences
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDisplay;
