
import { useState } from "react";
import { Quote, quotesMock } from "@/types/quote";
import { useQuoteFilters } from "./quotes/useQuoteFilters";
import { useQuoteActions } from "./quotes/useQuoteActions";
import { useQuoteItems } from "./quotes/useQuoteItems";
import { useQuoteManagement } from "./quotes/useQuoteManagement";
import { useQuoteStats } from "./quotes/useQuoteStats";

export const useQuotesState = () => {
  const [quotes, setQuotes] = useState<Quote[]>(quotesMock);
  
  // Initialiser les hooks spécialisés
  const { 
    filteredQuotes, 
    searchTerm, 
    statusFilter, 
    handleSearch, 
    filterByStatus,
    updateFilters 
  } = useQuoteFilters(quotes);
  
  const { 
    currentQuote, 
    isAddQuoteDialogOpen, 
    isAddItemDialogOpen, 
    handleViewQuote, 
    handleAddQuote, 
    handleDeleteQuote,
    setCurrentQuote,
    setIsAddQuoteDialogOpen,
    setIsAddItemDialogOpen
  } = useQuoteActions(quotes, setQuotes, updateFilters);
  
  const { 
    addQuoteItem, 
    removeQuoteItem 
  } = useQuoteItems(quotes, setQuotes, currentQuote, setCurrentQuote, updateFilters);
  
  const { 
    createNewQuote, 
    updateQuoteStatus 
  } = useQuoteManagement(quotes, setQuotes, currentQuote, setCurrentQuote, updateFilters);
  
  const { calculateQuoteStats } = useQuoteStats(quotes);
  
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
