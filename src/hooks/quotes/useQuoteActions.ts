
import { useState } from "react";
import { toast } from "sonner";
import { Quote, QuoteStatus, QuoteItem } from "@/types/quote";
import { usePermissions } from "../usePermissions";

export const useQuoteActions = (
  quotes: Quote[],
  setQuotes: React.Dispatch<React.SetStateAction<Quote[]>>,
  updateFilters: (quotes: Quote[]) => void
) => {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [isAddQuoteDialogOpen, setIsAddQuoteDialogOpen] = useState(false);
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const { hasPermission } = usePermissions();

  const handleViewQuote = (quote: Quote) => {
    setCurrentQuote(quote);
  };

  const handleAddQuote = () => {
    if (hasPermission("inventory.add")) {
      setIsAddQuoteDialogOpen(true);
    } else {
      toast.error("Vous n'avez pas les permissions nécessaires pour créer un devis");
    }
  };

  const handleDeleteQuote = (quote: Quote) => {
    if (!hasPermission("inventory.delete")) {
      toast.error("Vous n'avez pas les permissions nécessaires pour supprimer un devis");
      return;
    }

    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le devis "${quote.reference}" ?`)) {
      const updatedQuotes = quotes.filter(q => q.id !== quote.id);
      setQuotes(updatedQuotes);
      updateFilters(updatedQuotes);
      toast.success(`Devis "${quote.reference}" supprimé avec succès`);
    }
  };

  return {
    currentQuote,
    isAddQuoteDialogOpen,
    isAddItemDialogOpen,
    handleViewQuote,
    handleAddQuote,
    handleDeleteQuote,
    setCurrentQuote,
    setIsAddQuoteDialogOpen,
    setIsAddItemDialogOpen
  };
};
