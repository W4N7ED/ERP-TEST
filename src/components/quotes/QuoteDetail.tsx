
import { useState } from "react";
import { Quote, QuoteStatus, QuoteItem } from "@/types/quote";
import { useQuotesState } from "@/hooks/useQuotesState";
import { toast } from "sonner";
import { usePermissions } from "@/hooks/usePermissions";
import { AddQuoteItemDialog } from "./AddQuoteItemDialog";

// Import refactored components
import { QuoteHeader } from "./detail/QuoteHeader";
import { QuoteInfoCard } from "./detail/QuoteInfoCard";
import { QuoteItemsList } from "./detail/QuoteItemsList";
import { ClientInfoCard } from "./detail/ClientInfoCard";
import { IssuerInfoCard } from "./detail/IssuerInfoCard";
import { QuoteHistoryCard } from "./detail/QuoteHistoryCard";
import { QuoteNotes } from "./detail/QuoteNotes";
import { formatCurrency, formatDate } from "./detail/utils/formatters";

interface QuoteDetailProps {
  quote: Quote;
  onBack: () => void;
}

export const QuoteDetail: React.FC<QuoteDetailProps> = ({ quote, onBack }) => {
  const { addQuoteItem, removeQuoteItem, updateQuoteStatus } = useQuotesState();
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const { hasPermission } = usePermissions();
  
  const handleStatusChange = (status: QuoteStatus) => {
    if (hasPermission("inventory.edit")) {
      updateQuoteStatus(quote.id, status);
    } else {
      toast.error("Vous n'avez pas les permissions pour modifier le statut du devis");
    }
  };
  
  const handleAddItem = (itemData: any) => {
    if (hasPermission("inventory.edit")) {
      addQuoteItem(quote.id, itemData);
    } else {
      toast.error("Vous n'avez pas les permissions pour ajouter un article au devis");
    }
  };
  
  const handleDeleteItem = (itemId: number) => {
    if (hasPermission("inventory.delete")) {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
        removeQuoteItem(quote.id, itemId);
      }
    } else {
      toast.error("Vous n'avez pas les permissions pour supprimer un article du devis");
    }
  };
  
  const handleSendQuote = () => {
    if (quote.status === "Brouillon" || quote.status === "En attente") {
      updateQuoteStatus(quote.id, "Envoyé");
      toast.success("Devis envoyé avec succès");
    } else {
      toast.error("Le devis ne peut pas être envoyé avec son statut actuel");
    }
  };
  
  const handleGeneratePDF = () => {
    toast.info("Génération du PDF...");
    // Logique de génération de PDF à implémenter
  };
  
  const canEdit = hasPermission("inventory.edit") && 
               (quote.status === "Brouillon" || quote.status === "En attente");

  const canDelete = hasPermission("inventory.delete") && 
                 (quote.status === "Brouillon" || quote.status === "En attente");
  
  return (
    <div className="animate-fade-in space-y-6">
      <QuoteHeader 
        quote={quote} 
        onBack={onBack} 
        onStatusChange={handleStatusChange}
        onGeneratePDF={handleGeneratePDF}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <QuoteInfoCard 
            quote={quote} 
            onSendQuote={handleSendQuote} 
            onStatusChange={handleStatusChange}
          />
          
          <QuoteItemsList 
            items={quote.items}
            onDeleteItem={handleDeleteItem}
            onAddItem={() => setIsAddItemDialogOpen(true)}
            formatCurrency={formatCurrency}
            canEdit={canEdit}
            canDelete={canDelete}
          />
          
          <QuoteNotes notes={quote.notes} terms={quote.terms} />
        </div>
        
        <div className="space-y-6">
          <ClientInfoCard client={quote.client} />
          <IssuerInfoCard issuer={quote.issuer} />
          <QuoteHistoryCard history={quote.history} />
        </div>
      </div>
      
      <AddQuoteItemDialog 
        open={isAddItemDialogOpen} 
        onOpenChange={setIsAddItemDialogOpen}
        onAddItem={handleAddItem}
      />
    </div>
  );
};
