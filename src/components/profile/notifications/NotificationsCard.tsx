
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Bell } from "lucide-react";
import NotificationChannels from './NotificationChannels';
import NotificationTypesList from './NotificationTypesList';

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
          <NotificationChannels 
            emailNotifications={emailNotifications}
            pushNotifications={pushNotifications}
            setEmailNotifications={setEmailNotifications}
            setPushNotifications={setPushNotifications}
          />
          
          <NotificationTypesList 
            settings={notificationSettings}
            onChange={handleNotificationSettingChange}
          />
          
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
