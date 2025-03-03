
import React from "react";
import { Quote, QuoteStatus } from "@/types/quote";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePermissions } from "@/hooks/usePermissions";

interface QuoteHeaderProps {
  quote: Quote;
  onBack: () => void;
  onStatusChange: (status: QuoteStatus) => void;
  onGeneratePDF: () => void;
}

export const QuoteHeader: React.FC<QuoteHeaderProps> = ({
  quote,
  onBack,
  onStatusChange,
  onGeneratePDF
}) => {
  const { hasPermission } = usePermissions();
  
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft size={16} />
        </Button>
        <h1 className="text-2xl font-bold">Devis {quote.reference}</h1>
        <StatusBadge status={quote.status} />
      </div>
      
      <div className="flex space-x-2">
        {quote.status !== "Validé" && quote.status !== "Refusé" && quote.status !== "Expiré" && (
          <Select 
            defaultValue={quote.status} 
            onValueChange={(value) => onStatusChange(value as QuoteStatus)} 
            disabled={!hasPermission("inventory.edit")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Changer le statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Brouillon">Brouillon</SelectItem>
              <SelectItem value="En attente">En attente</SelectItem>
              <SelectItem value="Envoyé">Envoyé</SelectItem>
              <SelectItem value="Validé">Validé</SelectItem>
              <SelectItem value="Refusé">Refusé</SelectItem>
              <SelectItem value="Expiré">Expiré</SelectItem>
            </SelectContent>
          </Select>
        )}
        
        <Button variant="outline" size="icon" onClick={onGeneratePDF} title="Télécharger en PDF">
          <Download size={16} />
        </Button>
        
        <Button variant="outline" size="icon" title="Imprimer">
          <Printer size={16} />
        </Button>
      </div>
    </div>
  );
};
