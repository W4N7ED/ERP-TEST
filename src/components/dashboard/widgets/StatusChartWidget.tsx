import React, { useEffect, useState } from "react";
import { StatusChart } from "@/components/dashboard/StatusChart";
import { statusChartData } from "@/components/dashboard/data/mockData";
import { getDatabaseInstance } from "@/services/database/databaseFactory";
import { shouldUseMockData } from "@/utils/databaseCheck";

interface StatusChartWidgetProps {
  className?: string;
}

export const StatusChartWidget: React.FC<StatusChartWidgetProps> = ({ className }) => {
  const [chartData, setChartData] = useState(statusChartData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Only try to fetch real data if we're not using mock data
      if (!shouldUseMockData()) {
        setIsLoading(true);
        try {
          const dbService = getDatabaseInstance();
          const interventions = await dbService.getInterventions();
          
          if (interventions.length > 0) {
            // Count interventions by status
            const statusCounts: Record<string, number> = {};
            
            interventions.forEach(intervention => {
              const status = intervention.status || 'Inconnu';
              statusCounts[status] = (statusCounts[status] || 0) + 1;
            });
            
            // Define colors for each status
            const statusColors: Record<string, string> = {
              'En attente': '#FBBF24',  // amber-400
              'En cours': '#3B82F6',    // blue-500
              'Terminé': '#10B981',     // green-500
              'Annulé': '#EF4444',      // red-500
              'Inconnu': '#6B7280'      // gray-500
            };
            
            // Convert to chart data format
            const newChartData = Object.entries(statusCounts).map(([name, value]) => ({
              name,
              value,
              color: statusColors[name] || '#6B7280' // Default to gray if color not defined
            }));
            
            setChartData(newChartData);
          }
        } catch (error) {
          console.error("Error fetching intervention data for chart:", error);
          // Keep using mock data as fallback
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className={`card-glass rounded-xl p-5 h-full ${className}`}>
      <h2 className="text-xl font-semibold mb-6">Statuts des interventions</h2>
      {isLoading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <StatusChart data={chartData} />
          <div className="grid grid-cols-2 gap-2 mt-4">
            {chartData.map((status, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                <span className="text-sm">{status.name}: {status.value}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
