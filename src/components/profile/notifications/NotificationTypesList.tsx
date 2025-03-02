
import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface NotificationSetting {
  interventions: boolean;
  tasks: boolean;
  quotes: boolean;
}

interface NotificationTypesListProps {
  settings: NotificationSetting;
  onChange: (setting: keyof NotificationSetting) => void;
}

const NotificationTypesList: React.FC<NotificationTypesListProps> = ({ settings, onChange }) => {
  return (
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
          checked={settings.interventions} 
          onCheckedChange={() => onChange('interventions')} 
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
          checked={settings.tasks} 
          onCheckedChange={() => onChange('tasks')} 
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
          checked={settings.quotes} 
          onCheckedChange={() => onChange('quotes')} 
        />
      </div>
    </div>
  );
};

export default NotificationTypesList;
