
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Maximize2, Minimize2 } from "lucide-react";

// Définition des tailles disponibles pour les widgets
export const widgetSizes = ["small", "medium", "large", "full"] as const;
export type WidgetSize = typeof widgetSizes[number];

export interface WidgetConfig {
  id: string;
  title: string;
  enabled: boolean;
  size: WidgetSize;
}

interface CustomizationPanelProps {
  widgets: WidgetConfig[];
  onWidgetToggle: (id: string) => void;
  onWidgetSizeChange: (id: string, direction: 'increase' | 'decrease') => void;
}

export function getWidgetSizeName(size: WidgetSize): string {
  switch(size) {
    case "small": return "Petit";
    case "medium": return "Moyen";
    case "large": return "Grand";
    case "full": return "Plein écran";
    default: return "Petit";
  }
}

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({ 
  widgets,
  onWidgetToggle,
  onWidgetSizeChange
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Personnalisation du tableau de bord</CardTitle>
        <CardDescription>Sélectionnez les widgets à afficher sur votre tableau de bord et ajustez leur taille</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {widgets.map((widget) => (
            <div key={widget.id} className="flex flex-col p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <Label htmlFor={`widget-${widget.id}`} className="font-medium">{widget.title}</Label>
                <Switch 
                  id={`widget-${widget.id}`} 
                  checked={widget.enabled}
                  onCheckedChange={() => onWidgetToggle(widget.id)}
                />
              </div>
              
              {widget.enabled && (
                <div className="flex items-center justify-between mt-2 p-2 bg-gray-50 rounded">
                  <span className="text-sm">Taille: {getWidgetSizeName(widget.size)}</span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => onWidgetSizeChange(widget.id, 'decrease')}
                      disabled={widget.size === widgetSizes[0]}
                      className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minimize2 size={16} />
                    </button>
                    <button 
                      onClick={() => onWidgetSizeChange(widget.id, 'increase')}
                      disabled={widget.size === widgetSizes[widgetSizes.length - 1]}
                      className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
