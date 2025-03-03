
import React from "react";
import { Quote } from "@/types/quote";
import { Calendar, Clock, User, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Send, FileSignature } from "lucide-react";
import { usePermissions } from "@/hooks/usePermissions";
import { toast } from "sonner";

interface QuoteInfoCardProps {
  quote: Quote;
  onSendQuote: () => void;
  onStatusChange: (status: string) => void;
}

export const QuoteInfoCard: React.FC<QuoteInfoCardProps> = ({
  quote,
  onSendQuote,
  onStatusChange
}) => {
  const { hasPermission, hasAnyPermission } = usePermissions();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };
  
  return (
    <div className="card-glass rounded-xl p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold mb-2">Informations du devis</h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-start space-x-2">
              <Calendar size={16} className="mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date de création</p>
                <p className="font-medium">{formatDate(quote.createdAt)}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Clock size={16} className="mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date d'expiration</p>
                <p className="font-medium">{formatDate(quote.expirationDate)}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <User size={16} className="mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Responsable</p>
                <p className="font-medium">{quote.responsibleName}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <FileText size={16} className="mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Référence</p>
                <p className="font-medium">{quote.reference}</p>
              </div>
            </div>
          </div>
          
          {quote.projectId && (
            <div className="mt-4 flex items-center space-x-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                Lié au projet #{quote.projectId}
              </Badge>
            </div>
          )}
          
          {quote.interventionId && (
            <div className="mt-2 flex items-center space-x-2">
              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                Lié à l'intervention #{quote.interventionId}
              </Badge>
            </div>
          )}
        </div>
        
        <div className="flex flex-col space-y-2">
          {quote.status === "Brouillon" && hasPermission("inventory.edit") && (
            <Button onClick={() => onStatusChange("En attente")}>
              Finaliser
            </Button>
          )}
          
          {(quote.status === "Brouillon" || quote.status === "En attente") && hasPermission("inventory.edit") && (
            <Button variant="outline" onClick={onSendQuote}>
              <Send size={16} className="mr-2" /> Envoyer
            </Button>
          )}
          
          {quote.status === "Envoyé" && hasAnyPermission(["inventory.edit", "inventory.add"]) && (
            <Button variant="outline" onClick={() => toast.info("Fonctionnalité de signature en développement")}>
              <FileSignature size={16} className="mr-2" /> Signature
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
