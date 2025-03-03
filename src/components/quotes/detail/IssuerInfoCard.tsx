
import React from "react";
import { User, Building } from "lucide-react";

interface IssuerInfoCardProps {
  issuer: {
    name: string;
    department: string;
    role: string;
  };
}

export const IssuerInfoCard: React.FC<IssuerInfoCardProps> = ({ issuer }) => {
  return (
    <div className="card-glass rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Émetteur</h3>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <User size={18} className="mt-0.5 text-muted-foreground" />
          <div>
            <p className="font-medium">{issuer.name}</p>
            <p className="text-sm text-muted-foreground">{issuer.role}</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Building size={18} className="mt-0.5 text-muted-foreground" />
          <p className="text-sm">{issuer.department}</p>
        </div>
      </div>
    </div>
  );
};
