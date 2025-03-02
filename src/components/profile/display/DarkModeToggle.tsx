
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";
import IntegrationsCard from '../integrations/IntegrationsCard';

interface DarkModeToggleProps {
  darkMode: boolean;
  toggleDarkMode: (enabled: boolean) => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ darkMode, toggleDarkMode }) => {
  return (
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
  );
};

export default DarkModeToggle;
