
import { useState } from "react";
import { Quote, QuoteStatus } from "@/types/quote";

export const useQuoteFilters = (initialQuotes: Quote[]) => {
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>(initialQuotes);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | "Tous">("Tous");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    applyFilters(term, statusFilter, initialQuotes);
  };

  const filterByStatus = (status: QuoteStatus | "Tous") => {
    setStatusFilter(status);
    applyFilters(searchTerm, status, initialQuotes);
  };

  const applyFilters = (term: string, status: QuoteStatus | "Tous", quotes: Quote[]) => {
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

  // Fonction pour mettre à jour les filtres lorsque les quotes changent
  const updateFilters = (quotes: Quote[]) => {
    applyFilters(searchTerm, statusFilter, quotes);
  };

  return {
    filteredQuotes,
    searchTerm,
    statusFilter,
    handleSearch,
    filterByStatus,
    updateFilters
  };
};
