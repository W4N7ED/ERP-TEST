
import React from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor } from "lucide-react";

interface ThemeSelectorProps {
  theme: string;
  setTheme: (value: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ theme, setTheme }) => {
  return (
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
  );
};

export default ThemeSelector;
