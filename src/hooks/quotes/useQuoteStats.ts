
import { Quote } from "@/types/quote";

export const useQuoteStats = (quotes: Quote[]) => {
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
    calculateQuoteStats
  };
};
