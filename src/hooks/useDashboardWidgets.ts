
import { useState, useEffect } from 'react';
import { availableWidgets } from '@/components/dashboard/data/mockData';
import { WidgetConfig, widgetSizes, WidgetSize } from '@/components/dashboard/CustomizationPanel';
import { toast } from 'sonner';

export const useDashboardWidgets = () => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [widgets, setWidgets] = useState<WidgetConfig[]>(() => {
    const savedWidgets = localStorage.getItem('dashboardWidgets');
    return savedWidgets ? JSON.parse(savedWidgets) : availableWidgets;
  });
  
  const handleWidgetToggle = (id: string) => {
    setWidgets(widgets.map(widget => 
      widget.id === id ? { ...widget, enabled: !widget.enabled } : widget
    ));
  };

  const handleWidgetSizeChange = (id: string, direction: 'increase' | 'decrease') => {
    setWidgets(widgets.map(widget => {
      if (widget.id === id) {
        const currentSizeIndex = widgetSizes.indexOf(widget.size);
        let newSizeIndex;
        
        if (direction === 'increase') {
          newSizeIndex = Math.min(currentSizeIndex + 1, widgetSizes.length - 1);
        } else {
          newSizeIndex = Math.max(currentSizeIndex - 1, 0);
        }
        
        return { ...widget, size: widgetSizes[newSizeIndex] };
      }
      return widget;
    }));
  };

  const saveCustomization = () => {
    localStorage.setItem('dashboardWidgets', JSON.stringify(widgets));
    setIsCustomizing(false);
    toast.success("Configuration du dashboard enregistrée");
  };

  const cancelCustomization = () => {
    // Restaurer la configuration sauvegardée
    const savedWidgets = localStorage.getItem('dashboardWidgets');
    if (savedWidgets) {
      setWidgets(JSON.parse(savedWidgets));
    } else {
      setWidgets(availableWidgets);
    }
    setIsCustomizing(false);
  };

  const isWidgetEnabled = (id: string): boolean => {
    const widget = widgets.find(w => w.id === id);
    return widget ? widget.enabled : false;
  };

  const getWidgetSize = (id: string): WidgetSize => {
    const widget = widgets.find(w => w.id === id);
    return widget ? widget.size : "small";
  };

  const getWidgetSizeClass = (id: string): string => {
    return `widget-size-${getWidgetSize(id)}`;
  };

  return {
    widgets,
    isCustomizing,
    setIsCustomizing,
    handleWidgetToggle,
    handleWidgetSizeChange,
    saveCustomization,
    cancelCustomization,
    isWidgetEnabled,
    getWidgetSize,
    getWidgetSizeClass
  };
};
