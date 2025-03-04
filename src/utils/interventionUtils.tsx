
import React from 'react';
import { Status, Priority } from '@/types/intervention';
import { Clock, Calendar, AlertTriangle, CheckCircle2, XCircle, Archive } from 'lucide-react';

export const getStatusIcon = (status: Status) => {
  switch(status) {
    case "À planifier": 
      return <Clock size={16} className="text-amber-500" />;
    case "Planifiée": 
      return <Calendar size={16} className="text-blue-400" />;
    case "En attente": 
      return <Clock size={16} className="text-amber-500" />;
    case "En cours":
      return <AlertTriangle size={16} className="text-blue-500" />;
    case "Terminée":
      return <CheckCircle2 size={16} className="text-green-500" />;
    case "Annulée":
      return <XCircle size={16} className="text-red-500" />;
    case "Archivée":
      return <Archive size={16} className="text-gray-500" />;
    default:
      return null;
  }
};

export const getStatusClass = (status: Status) => {
  switch(status) {
    case "À planifier": return "bg-amber-100 text-amber-800";
    case "Planifiée": return "bg-blue-100 text-blue-800";
    case "En attente": return "bg-amber-100 text-amber-800";
    case "En cours": return "bg-blue-100 text-blue-800";
    case "Terminée": return "bg-green-100 text-green-800";
    case "Annulée": return "bg-red-100 text-red-800";
    case "Archivée": return "bg-gray-100 text-gray-800";
    default: return "";
  }
};

export const getPriorityClass = (priority: Priority) => {
  switch(priority) {
    case "Basse": return "bg-gray-100 text-gray-700";
    case "Moyenne": return "bg-blue-100 text-blue-700";
    case "Haute": return "bg-amber-100 text-amber-700";
    case "Critique": return "bg-red-100 text-red-700";
    default: return "";
  }
};
