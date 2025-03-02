import { useState } from "react";
import { toast } from "sonner";
import { Quote, QuoteStatus, QuoteItem, quotesMock } from "@/types/quote";
import { usePermissions } from "./usePermissions";

export const useQuotesState = () => {
  const [quotes, setQuotes] = useState<Quote[]>(quotesMock);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>(quotesMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | "Tous">("Tous");
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [isAddQuoteDialogOpen, setIsAddQuoteDialogOpen] = useState(false);
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const { hasPermission } = usePermissions();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    applyFilters(term, statusFilter);
  };

  const filterByStatus = (status: QuoteStatus | "Tous") => {
    setStatusFilter(status);
    applyFilters(searchTerm, status);
  };

  const applyFilters = (term: string, status: QuoteStatus | "Tous") => {
    let filtered = [...quotes];
    
    if (status !== "Tous") {
      filtered = filtered.filter(quote => quote.status === status);
    }
    
    if (term.trim() !== "") {
      filtered = filtered.filter(
        quote => 
          quote.reference.toLowerCase().includes(term.toLowerCase()) ||
          quote.client.name.toLowerCase().includes(term.toLowerCase()) ||
          quote.client.company?.toLowerCase().includes(term.toLowerCase()) ||
          quote.client.email.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    setFilteredQuotes(filtered);
  };

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
      setFilteredQuotes(filteredQuotes.filter(q => q.id !== quote.id));
      toast.success(`Devis "${quote.reference}" supprimé avec succès`);
    }
  };

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
    
    // Recalculate quote totals
    const subtotal = updatedItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    const taxTotal = updatedItems.reduce((sum, item) => {
      const itemSubtotal = item.unitPrice * item.quantity;
      return sum + (itemSubtotal * (item.taxRate / 100));
    }, 0);
    
    const updatedQuote = {
      ...quotes[quoteIndex],
      items: updatedItems,
      subtotal: parseFloat(subtotal.toFixed(2)),
      taxTotal: parseFloat(taxTotal.toFixed(2)),
      total: parseFloat((subtotal + taxTotal).toFixed(2)),
      updatedAt: new Date().toISOString(),
      history: [
        ...quotes[quoteIndex].history,
        {
          date: new Date().toISOString(),
          action: "Ajout d'article",
          user: "Utilisateur actuel" // Idéalement, utiliser l'utilisateur connecté
        }
      ]
    };
    
    const updatedQuotes = [...quotes];
    updatedQuotes[quoteIndex] = updatedQuote;
    setQuotes(updatedQuotes);
    
    const filteredIndex = filteredQuotes.findIndex(q => q.id === quoteId);
    if (filteredIndex !== -1) {
      const updatedFiltered = [...filteredQuotes];
      updatedFiltered[filteredIndex] = updatedQuote;
      setFilteredQuotes(updatedFiltered);
    }
    
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
    
    // Recalculate quote totals
    const subtotal = updatedItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    const taxTotal = updatedItems.reduce((sum, item) => {
      const itemSubtotal = item.unitPrice * item.quantity;
      return sum + (itemSubtotal * (item.taxRate / 100));
    }, 0);
    
    const updatedQuote = {
      ...quotes[quoteIndex],
      items: updatedItems,
      subtotal: parseFloat(subtotal.toFixed(2)),
      taxTotal: parseFloat(taxTotal.toFixed(2)),
      total: parseFloat((subtotal + taxTotal).toFixed(2)),
      updatedAt: new Date().toISOString(),
      history: [
        ...quotes[quoteIndex].history,
        {
          date: new Date().toISOString(),
          action: `Suppression d'article: ${itemName}`,
          user: "Utilisateur actuel" // Idéalement, utiliser l'utilisateur connecté
        }
      ]
    };
    
    const updatedQuotes = [...quotes];
    updatedQuotes[quoteIndex] = updatedQuote;
    setQuotes(updatedQuotes);
    
    const filteredIndex = filteredQuotes.findIndex(q => q.id === quoteId);
    if (filteredIndex !== -1) {
      const updatedFiltered = [...filteredQuotes];
      updatedFiltered[filteredIndex] = updatedQuote;
      setFilteredQuotes(updatedFiltered);
    }
    
    if (currentQuote && currentQuote.id === quoteId) {
      setCurrentQuote(updatedQuote);
    }
    
    toast.success(`Article "${itemName}" supprimé du devis`);
  };

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
    setFilteredQuotes([...filteredQuotes, newQuote]);
    
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
    
    const filteredIndex = filteredQuotes.findIndex(q => q.id === quoteId);
    if (filteredIndex !== -1) {
      const updatedFiltered = [...filteredQuotes];
      updatedFiltered[filteredIndex] = updatedQuote;
      setFilteredQuotes(updatedFiltered);
    }
    
    if (currentQuote && currentQuote.id === quoteId) {
      setCurrentQuote(updatedQuote);
    }
    
    toast.success(`Statut du devis mis à jour: ${newStatus}`);
    return updatedQuote;
  };

  const calculateQuoteStats = () => {
    const draft = quotes.filter(q => q.status === "Brouillon").length;
    const pending = quotes.filter(q => q.status === "En attente").length;
    const sent = quotes.filter(q => q.status === "Envoyé").length;
    const approved = quotes.filter(q => q.status === "Validé").length;
    const rejected = quotes.filter(q => q.status === "Refusé").length;
    const expired = quotes.filter(q => q.status === "Expiré").length;
    
    const totalAmount = quotes.reduce((sum, q) => sum + q.total, 0);
    const approvedAmount = quotes.filter(q => q.status === "Validé").reduce((sum, q) => sum + q.total, 0);
    
    const conversionRate = sent > 0 ? (approved / sent) * 100 : 0;
    
    return {
      draft,
      pending,
      sent,
      approved,
      rejected,
      expired,
      totalAmount,
      approvedAmount,
      conversionRate: parseFloat(conversionRate.toFixed(2))
    };
  };

  return {
    quotes,
    filteredQuotes,
    searchTerm,
    statusFilter,
    currentQuote,
    isAddQuoteDialogOpen,
    isAddItemDialogOpen,
    stats: calculateQuoteStats(),
    handleSearch,
    filterByStatus,
    handleViewQuote,
    handleAddQuote,
    handleDeleteQuote,
    addQuoteItem,
    removeQuoteItem,
    createNewQuote,
    updateQuoteStatus,
    setIsAddQuoteDialogOpen,
    setIsAddItemDialogOpen,
    setCurrentQuote
  };
};
