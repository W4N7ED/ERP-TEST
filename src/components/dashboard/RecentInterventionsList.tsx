
import React from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { ChevronRight } from "lucide-react";

interface Intervention {
  id: number;
  title: string;
  client: string;
  status: string;
  date: string;
}

interface RecentInterventionsListProps {
  interventions: Intervention[];
  className?: string;
}

export const getStatusClass = (status: string) => {
  switch(status) {
    case "En attente": return "status-pending";
    case "En cours": return "status-in-progress";
    case "Terminé": return "status-completed";
    case "Annulé": return "status-cancelled";
    default: return "";
  }
};

export const RecentInterventionsList: React.FC<RecentInterventionsListProps> = ({ 
  interventions,
  className
}) => {
  return (
    <div className={`card-glass rounded-xl p-5 h-full ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Interventions récentes</h2>
        <CustomButton variant="ghost" className="text-sm">
          Voir tout <ChevronRight size={16} className="ml-1" />
        </CustomButton>
      </div>
      
      <div className="space-y-4">
        {interventions.map(intervention => (
          <div 
            key={intervention.id}
            className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-all bg-white"
          >
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">{intervention.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(intervention.status)}`}>
                {intervention.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{intervention.client}</span>
              <span>{new Date(intervention.date).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
