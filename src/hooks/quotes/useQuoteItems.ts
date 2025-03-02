
import { toast } from "sonner";
import { Quote, QuoteItem } from "@/types/quote";

export const useQuoteItems = (
  quotes: Quote[],
  setQuotes: React.Dispatch<React.SetStateAction<Quote[]>>,
  currentQuote: Quote | null,
  setCurrentQuote: React.Dispatch<React.SetStateAction<Quote | null>>,
  updateFilters: (quotes: Quote[]) => void
) => {
  const addQuoteItem = (quoteId: number, item: Omit<QuoteItem, "id" | "total">) => {
    const quoteIndex = quotes.findIndex(q => q.id === quoteId);
    
    if (quoteIndex === -1) {
      toast.error("Devis non trouvé");
      return null;
    }
    
    const newItemId = Math.max(
      ...quotes.flatMap(q => q.items.map(item => item.id)),
      0
    ) + 1;
    
    const discount = item.discount || 0;
    const discountAmount = (item.unitPrice * item.quantity) * (discount / 100);
    const totalBeforeTax = (item.unitPrice * item.quantity) - discountAmount;
    const taxAmount = totalBeforeTax * (item.taxRate / 100);
    const total = totalBeforeTax + taxAmount;
    
    const newItem: QuoteItem = {
      id: newItemId,
      ...item,
      total: parseFloat(total.toFixed(2))
    };
    
    const updatedItems = [...quotes[quoteIndex].items, newItem];
    const updatedQuote = updateQuoteTotals(quotes[quoteIndex], updatedItems, "Ajout d'article");
    
    const updatedQuotes = [...quotes];
    updatedQuotes[quoteIndex] = updatedQuote;
    setQuotes(updatedQuotes);
    updateFilters(updatedQuotes);
    
    if (currentQuote && currentQuote.id === quoteId) {
      setCurrentQuote(updatedQuote);
    }
    
    toast.success(`Article ajouté au devis`);
    return newItem;
  };

  const removeQuoteItem = (quoteId: number, itemId: number) => {
    const quoteIndex = quotes.findIndex(q => q.id === quoteId);
    
    if (quoteIndex === -1) {
      toast.error("Devis non trouvé");
      return;
    }
    
    const itemIndex = quotes[quoteIndex].items.findIndex(i => i.id === itemId);
    
    if (itemIndex === -1) {
      toast.error("Article non trouvé");
      return;
    }
    
    const itemName = quotes[quoteIndex].items[itemIndex].name;
    const updatedItems = quotes[quoteIndex].items.filter(i => i.id !== itemId);
    const updatedQuote = updateQuoteTotals(quotes[quoteIndex], updatedItems, `Suppression d'article: ${itemName}`);
    
    const updatedQuotes = [...quotes];
    updatedQuotes[quoteIndex] = updatedQuote;
    setQuotes(updatedQuotes);
    updateFilters(updatedQuotes);
    
    if (currentQuote && currentQuote.id === quoteId) {
      setCurrentQuote(updatedQuote);
    }
    
    toast.success(`Article "${itemName}" supprimé du devis`);
  };

  // Fonction utilitaire pour recalculer les totaux du devis
  const updateQuoteTotals = (quote: Quote, items: QuoteItem[], actionMessage: string): Quote => {
    const subtotal = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    const taxTotal = items.reduce((sum, item) => {
      const itemSubtotal = item.unitPrice * item.quantity;
      return sum + (itemSubtotal * (item.taxRate / 100));
    }, 0);
    
    return {
      ...quote,
      items,
      subtotal: parseFloat(subtotal.toFixed(2)),
      taxTotal: parseFloat(taxTotal.toFixed(2)),
      total: parseFloat((subtotal + taxTotal).toFixed(2)),
      updatedAt: new Date().toISOString(),
      history: [
        ...quote.history,
        {
          date: new Date().toISOString(),
          action: actionMessage,
          user: "Utilisateur actuel" // Idéalement, utiliser l'utilisateur connecté
        }
      ]
    };
  };

  return {
    addQuoteItem,
    removeQuoteItem
  };
};
