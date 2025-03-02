
import { toast } from "sonner";
import { Quote, QuoteStatus } from "@/types/quote";

export const useQuoteManagement = (
  quotes: Quote[],
  setQuotes: React.Dispatch<React.SetStateAction<Quote[]>>,
  currentQuote: Quote | null,
  setCurrentQuote: React.Dispatch<React.SetStateAction<Quote | null>>,
  updateFilters: (quotes: Quote[]) => void
) => {
  const createNewQuote = (quoteData: {
    client: {
      name: string;
      company?: string;
      address: string;
      email: string;
      phone: string;
      vatNumber?: string;
    };
    expirationDate: string;
    projectId?: number;
    interventionId?: number;
    notes?: string;
    terms?: string;
  }) => {
    const newId = Math.max(...quotes.map(q => q.id)) + 1;
    const today = new Date().toISOString().split('T')[0];
    const reference = `DEV-${new Date().getFullYear()}-${newId.toString().padStart(3, '0')}`;
    
    const newQuote: Quote = {
      id: newId,
      reference,
      createdAt: today,
      expirationDate: quoteData.expirationDate,
      status: "Brouillon",
      client: quoteData.client,
      issuer: {
        name: "Utilisateur actuel", // Idéalement, utiliser l'utilisateur connecté
        department: "Département",
        role: "Rôle",
      },
      items: [],
      subtotal: 0,
      taxTotal: 0,
      total: 0,
      notes: quoteData.notes,
      terms: quoteData.terms || "Ce devis est valable 30 jours. Paiement à 30 jours après installation.",
      projectId: quoteData.projectId,
      interventionId: quoteData.interventionId,
      responsibleId: 1, // Idéalement, utiliser l'ID de l'utilisateur connecté
      responsibleName: "Utilisateur actuel", // Idéalement, utiliser l'utilisateur connecté
      history: [
        {
          date: today,
          action: "Création",
          user: "Utilisateur actuel", // Idéalement, utiliser l'utilisateur connecté
        }
      ],
    };
    
    const updatedQuotes = [...quotes, newQuote];
    setQuotes(updatedQuotes);
    updateFilters(updatedQuotes);
    
    toast.success(`Devis ${reference} créé avec succès`);
    return newQuote;
  };

  const updateQuoteStatus = (quoteId: number, newStatus: QuoteStatus) => {
    const quoteIndex = quotes.findIndex(q => q.id === quoteId);
    
    if (quoteIndex === -1) {
      toast.error("Devis non trouvé");
      return null;
    }
    
    const updatedQuote = {
      ...quotes[quoteIndex],
      status: newStatus,
      updatedAt: new Date().toISOString(),
      history: [
        ...quotes[quoteIndex].history,
        {
          date: new Date().toISOString(),
          action: `Statut modifié: ${newStatus}`,
          user: "Utilisateur actuel" // Idéalement, utiliser l'utilisateur connecté
        }
      ]
    };
    
    const updatedQuotes = [...quotes];
    updatedQuotes[quoteIndex] = updatedQuote;
    setQuotes(updatedQuotes);
    updateFilters(updatedQuotes);
    
    if (currentQuote && currentQuote.id === quoteId) {
      setCurrentQuote(updatedQuote);
    }
    
    toast.success(`Statut du devis mis à jour: ${newStatus}`);
    return updatedQuote;
  };

  return {
    createNewQuote,
    updateQuoteStatus
  };
};
