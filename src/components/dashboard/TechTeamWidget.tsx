
import React from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { Users } from "lucide-react";

interface TechTeamWidgetProps {
  className?: string;
}

export const TechTeamWidget: React.FC<TechTeamWidgetProps> = ({ className }) => {
  return (
    <div className={`card-glass rounded-xl p-5 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Équipe technique</h2>
        <CustomButton variant="ghost" icon={<Users size={16} />} className="text-sm">
          Gestion de l'équipe
        </CustomButton>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 bg-white">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
              {["JD", "ML", "AT", "CP"][i]}
            </div>
            <div>
              <h3 className="font-medium text-sm">
                {["Jean Dupont", "Marie Lambert", "Alex Thibault", "Claire Petit"][i]}
              </h3>
              <p className="text-xs text-muted-foreground">
                {["Technicien senior", "Technicienne réseau", "Admin système", "Support niveau 2"][i]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
