
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, Moon, Sun, Bell } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProfileDisplay: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("fr");
  const [theme, setTheme] = useState<string>("system");
  const [compactMode, setCompactMode] = useState<boolean>(false);
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [pushNotifications, setPushNotifications] = useState<boolean>(true);
  const [notificationSettings, setNotificationSettings] = useState({
    interventions: true,
    tasks: true,
    quotes: true
  });
  
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
                  <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                  Système
                </Button>
              </div>
            </div>
            
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
