
import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface NotificationChannelsProps {
  emailNotifications: boolean;
  pushNotifications: boolean;
  setEmailNotifications: (enabled: boolean) => void;
  setPushNotifications: (enabled: boolean) => void;
}

const NotificationChannels: React.FC<NotificationChannelsProps> = ({ 
  emailNotifications, 
  pushNotifications, 
  setEmailNotifications, 
  setPushNotifications 
}) => {
  return (
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
  );
};

export default NotificationChannels;
