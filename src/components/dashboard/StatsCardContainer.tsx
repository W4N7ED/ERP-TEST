
import React from "react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Wrench, Package, FolderKanban, FileText } from "lucide-react";
import { WidgetConfig } from "./CustomizationPanel";

interface StatsCardContainerProps {
  isLoading: boolean;
  widgets: WidgetConfig[];
  getWidgetSizeClass: (id: string) => string;
  isWidgetEnabled: (id: string) => boolean;
}

export const StatsCardContainer: React.FC<StatsCardContainerProps> = ({
  isLoading,
  widgets,
  getWidgetSizeClass,
  isWidgetEnabled,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 rounded-xl bg-gray-100 animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {isWidgetEnabled("interventionsEnCours") && (
        <DashboardCard
          title="Interventions en cours"
          value="18"
          icon={<Wrench size={20} />}
          description="3 en attente aujourd'hui"
          trend={{ value: 12, isPositive: true }}
          className={getWidgetSizeClass("interventionsEnCours")}
        />
      )}
      
      {isWidgetEnabled("stockTotal") && (
        <DashboardCard
          title="Stock total"
          value="342 articles"
          icon={<Package size={20} />}
          description="8 alertes stock bas"
          trend={{ value: 5, isPositive: false }}
          className={getWidgetSizeClass("stockTotal")}
        />
      )}
      
      {isWidgetEnabled("projetsActifs") && (
        <DashboardCard
          title="Projets actifs"
          value="7"
          icon={<FolderKanban size={20} />}
          description="2 en retard"
          trend={{ value: 20, isPositive: true }}
          className={getWidgetSizeClass("projetsActifs")}
        />
      )}
      
      {isWidgetEnabled("devisEnAttente") && (
        <DashboardCard
          title="Devis en attente"
          value="12"
          icon={<FileText size={20} />}
          description="Montant: 24,850 €"
          trend={{ value: 8, isPositive: true }}
          className={getWidgetSizeClass("devisEnAttente")}
        />
      )}
    </div>
  );
};
