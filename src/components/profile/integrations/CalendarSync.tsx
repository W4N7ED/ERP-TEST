
import React from 'react';
import { Calendar, AlertCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface CalendarSyncProps {
  calendarSync: boolean;
  setCalendarSync: (value: boolean) => void;
  googleConnected: boolean;
}

const CalendarSync: React.FC<CalendarSyncProps> = ({ 
  calendarSync, 
  setCalendarSync,
  googleConnected
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
        <div className="flex items-center space-x-3">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <div className="space-y-0.5">
            <Label htmlFor="calendar-sync">Synchronisation avec Google Calendar</Label>
            <p className="text-sm text-muted-foreground">
              Vos interventions et tâches apparaîtront dans votre calendrier Google
            </p>
          </div>
        </div>
        <Switch 
          id="calendar-sync" 
          checked={calendarSync} 
          onCheckedChange={setCalendarSync} 
        />
      </div>
      
      {!googleConnected && calendarSync && (
        <div className="rounded-md bg-amber-50 p-4 border border-amber-200 text-amber-800">
          <div className="flex">
            <AlertCircle className="h-5 w-5 mr-2 text-amber-800" />
            <div>
              <h4 className="text-sm font-medium">Connexion requise</h4>
              <p className="text-xs mt-1">
                Vous devez connecter votre compte Google pour activer la synchronisation du calendrier.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarSync;
