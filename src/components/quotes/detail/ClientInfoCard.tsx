
import React from "react";
import { QuoteContact } from "@/types/quote";
import { User, MapPin, Mail, Phone } from "lucide-react";

interface ClientInfoCardProps {
  client: QuoteContact;
}

export const ClientInfoCard: React.FC<ClientInfoCardProps> = ({ client }) => {
  return (
    <div className="card-glass rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Client</h3>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <User size={18} className="mt-0.5 text-muted-foreground" />
          <div>
            <p className="font-medium">{client.name}</p>
            {client.company && (
              <p className="text-sm text-muted-foreground">{client.company}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <MapPin size={18} className="mt-0.5 text-muted-foreground" />
          <p className="text-sm">{client.address}</p>
        </div>
        
        <div className="flex items-start space-x-3">
          <Mail size={18} className="mt-0.5 text-muted-foreground" />
          <p className="text-sm">{client.email}</p>
        </div>
        
        <div className="flex items-start space-x-3">
          <Phone size={18} className="mt-0.5 text-muted-foreground" />
          <p className="text-sm">{client.phone}</p>
        </div>
      </div>
    </div>
  );
};
