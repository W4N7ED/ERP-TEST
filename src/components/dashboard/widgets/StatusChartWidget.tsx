
import React from "react";
import { StatusChart } from "@/components/dashboard/StatusChart";
import { statusChartData } from "@/components/dashboard/data/mockData";

interface StatusChartWidgetProps {
  className?: string;
}

export const StatusChartWidget: React.FC<StatusChartWidgetProps> = ({ className }) => {
  return (
    <div className={`card-glass rounded-xl p-5 h-full ${className}`}>
      <h2 className="text-xl font-semibold mb-6">Statuts des interventions</h2>
      <StatusChart data={statusChartData} />
      <div className="grid grid-cols-2 gap-2 mt-4">
        {statusChartData.map((status, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
            <span className="text-sm">{status.name}: {status.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
