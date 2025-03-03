
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useThemeContext } from "@/components/ThemeProvider";
import { Sun, Moon, Monitor } from "lucide-react";

const AppearanceSettings = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useThemeContext();

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    toast({
      title: "Thème modifié",
      description: `Le thème a été changé en ${newTheme}.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apparence</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="space-y-2">
          <Label>Thème</Label>
          <div className="flex items-center space-x-2">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              onClick={() => handleThemeChange("light")}
              className="flex items-center gap-2"
            >
              <Sun className="h-4 w-4" />
              Clair
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              onClick={() => handleThemeChange("dark")}
              className="flex items-center gap-2"
            >
              <Moon className="h-4 w-4" />
              Sombre
            </Button>
            <Button
              variant={theme === "system" ? "default" : "outline"}
              onClick={() => handleThemeChange("system")}
              className="flex items-center gap-2"
            >
              <Monitor className="h-4 w-4" />
              Système
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
