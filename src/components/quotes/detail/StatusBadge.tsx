
import { QuoteStatus } from "@/types/quote";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";

interface StatusBadgeProps {
  status: QuoteStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusBadgeClass = (status: QuoteStatus) => {
    switch(status) {
      case "Brouillon": return "bg-gray-100 text-gray-800";
      case "En attente": return "bg-amber-50 text-amber-700";
      case "Envoyé": return "bg-blue-50 text-blue-700";
      case "Validé": return "bg-green-50 text-green-700";
      case "Refusé": return "bg-red-50 text-red-700";
      case "Expiré": return "bg-purple-50 text-purple-700";
      default: return "";
    }
  };
  
  const getStatusIcon = (status: QuoteStatus) => {
    switch(status) {
      case "Brouillon": return <FileText size={16} />;
      case "En attente": return <Clock size={16} className="text-amber-500" />;
      case "Envoyé": return <Send size={16} className="text-blue-500" />;
      case "Validé": return <CheckCircle2 size={16} className="text-green-500" />;
      case "Refusé": return <AlertCircle size={16} className="text-red-500" />;
      case "Expiré": return <AlertCircle size={16} className="text-purple-500" />;
      default: return null;
    }
  };

  return (
    <Badge variant="outline" className={`ml-2 ${getStatusBadgeClass(status)}`}>
      {getStatusIcon(status)} <span className="ml-1">{status}</span>
    </Badge>
  );
};
