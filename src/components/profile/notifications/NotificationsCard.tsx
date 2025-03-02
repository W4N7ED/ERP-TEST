
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, Bell } from "lucide-react";

interface NotificationSetting {
  interventions: boolean;
  tasks: boolean;
  quotes: boolean;
}

interface NotificationsCardProps {
  onSave?: () => void;
}

const NotificationsCard: React.FC<NotificationsCardProps> = ({ onSave }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [pushNotifications, setPushNotifications] = useState<boolean>(true);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting>({
    interventions: true,
    tasks: true,
    quotes: true
  });
  
  const handleSaveNotificationSettings = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Préférences de notifications mises à jour");
      if (onSave) onSave();
    }, 1000);
  };
  
  const handleNotificationSettingChange = (setting: keyof NotificationSetting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  return (
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
  );
};

export default NotificationsCard;
