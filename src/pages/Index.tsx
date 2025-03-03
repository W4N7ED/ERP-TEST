
import React from "react";
import Navbar from "@/components/layout/Navbar";
import { CustomizationPanel } from "@/components/dashboard/CustomizationPanel";
import { RecentInterventionsList } from "@/components/dashboard/RecentInterventionsList";
import { StatsCardContainer } from "@/components/dashboard/StatsCardContainer";
import { TechTeamWidget } from "@/components/dashboard/TechTeamWidget";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatusChartWidget } from "@/components/dashboard/widgets/StatusChartWidget";
import { useLoadingState } from "@/hooks/useLoadingState";
import { useDashboardWidgets } from "@/hooks/useDashboardWidgets";
import { recentInterventions } from "@/components/dashboard/data/mockData";

const Index = () => {
  const { isLoading } = useLoadingState();
  const { 
    widgets,
    isCustomizing,
    setIsCustomizing,
    handleWidgetToggle,
    handleWidgetSizeChange,
    saveCustomization,
    cancelCustomization,
    isWidgetEnabled,
    getWidgetSizeClass
  } = useDashboardWidgets();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <div className="p-4 md:p-6 lg:p-8">
          <DashboardHeader 
            isCustomizing={isCustomizing}
            onStartCustomizing={() => setIsCustomizing(true)}
            onSaveCustomization={saveCustomization}
            onCancelCustomization={cancelCustomization}
          />
          
          {isCustomizing ? (
            <CustomizationPanel 
              widgets={widgets}
              onWidgetToggle={handleWidgetToggle}
              onWidgetSizeChange={handleWidgetSizeChange}
            />
          ) : (
            <>
              <StatsCardContainer 
                isLoading={isLoading}
                widgets={widgets}
                getWidgetSizeClass={getWidgetSizeClass}
                isWidgetEnabled={isWidgetEnabled}
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {isWidgetEnabled("interventionsRecentes") && (
                  <div className={getWidgetSizeClass("interventionsRecentes")}>
                    <RecentInterventionsList 
                      interventions={recentInterventions}
                    />
                  </div>
                )}
                
                {isWidgetEnabled("statutsInterventions") && (
                  <div className={getWidgetSizeClass("statutsInterventions")}>
                    <StatusChartWidget />
                  </div>
                )}
              </div>
              
              {isWidgetEnabled("equipeTechnique") && (
                <TechTeamWidget className={getWidgetSizeClass("equipeTechnique")} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
