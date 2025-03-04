
import { Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import React from "react";

export const getStatusIcon = (status: string): React.ReactNode => {
  switch(status) {
    case "En attente": 
      return <Clock size={16} className="text-amber-500" />;
    case "En cours":
      return <AlertCircle size={16} className="text-blue-500" />;
    case "Terminé":
    case "Terminée":
      return <CheckCircle2 size={16} className="text-green-500" />;
    default:
      return null;
  }
};

export const getStatusClass = (status: string): string => {
  switch(status) {
    case "En attente": 
    case "À faire":
      return "bg-amber-50 text-amber-700";
    case "En cours":
      return "bg-blue-50 text-blue-700";
    case "Terminé":
    case "Terminée":
      return "bg-green-50 text-green-700";
    default:
      return "";
  }
};

export const getTaskPriorityClass = (priority: string): string => {
  switch(priority) {
    case "Basse": return "bg-gray-50 text-gray-700";
    case "Moyenne": return "bg-blue-50 text-blue-700";
    case "Élevée": 
    case "Haute":
      return "bg-orange-50 text-orange-700";
    case "Urgente": return "bg-red-50 text-red-700";
    default: return "";
  }
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('fr-FR');
};
