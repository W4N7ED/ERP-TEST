
import React from "react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Wrench, Package, FolderKanban, FileText } from "lucide-react";
import { WidgetConfig } from "./CustomizationPanel";
import { getDatabaseInstance } from "@/services/database/databaseFactory";
import { useState, useEffect } from "react";

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
  const [projectsCount, setProjectsCount] = useState(0);
  const [interventionsCount, setInterventionsCount] = useState(0);
  const [pendingQuotes, setPendingQuotes] = useState(12); // Mock data for now
  const [stockItems, setStockItems] = useState(342); // Mock data for now
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setDataLoading(true);
      try {
        const dbService = getDatabaseInstance();
        
        // Load projects count
        const projects = await dbService.getProjects();
        const activeProjects = projects.filter(p => p.status === "En cours").length;
        setProjectsCount(activeProjects);
        
        // Load interventions count
        const interventions = await dbService.getInterventions();
        const activeInterventions = interventions.filter(i => i.status === "En cours").length;
        setInterventionsCount(activeInterventions);
        
        // In the future we would load quotes and stock items here
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
      } finally {
        setDataLoading(false);
      }
    };

    try {
      loadData();
    } catch (err) {
      console.warn("Database not initialized yet, using mock data for stats", err);
      setDataLoading(false);
    }
  }, []);

  if (isLoading || dataLoading) {
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
          value={interventionsCount.toString()}
          icon={<Wrench size={20} />}
          description="3 en attente aujourd'hui"
          trend={{ value: 12, isPositive: true }}
          className={getWidgetSizeClass("interventionsEnCours")}
        />
      )}
      
      {isWidgetEnabled("stockTotal") && (
        <DashboardCard
          title="Stock total"
          value={`${stockItems} articles`}
          icon={<Package size={20} />}
          description="8 alertes stock bas"
          trend={{ value: 5, isPositive: false }}
          className={getWidgetSizeClass("stockTotal")}
        />
      )}
      
      {isWidgetEnabled("projetsActifs") && (
        <DashboardCard
          title="Projets actifs"
          value={projectsCount.toString()}
          icon={<FolderKanban size={20} />}
          description="2 en retard"
          trend={{ value: 20, isPositive: true }}
          className={getWidgetSizeClass("projetsActifs")}
        />
      )}
      
      {isWidgetEnabled("devisEnAttente") && (
        <DashboardCard
          title="Devis en attente"
          value={pendingQuotes.toString()}
          icon={<FileText size={20} />}
          description="Montant: 24,850 €"
          trend={{ value: 8, isPositive: true }}
          className={getWidgetSizeClass("devisEnAttente")}
        />
      )}
    </div>
  );
};
