
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { History, ChevronUp, ChevronDown } from "lucide-react";

interface HistoryEntry {
  date: string;
  action: string;
  user: string;
}

interface QuoteHistoryCardProps {
  history: HistoryEntry[];
}

export const QuoteHistoryCard: React.FC<QuoteHistoryCardProps> = ({ history }) => {
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };
  
  return (
    <div className="card-glass rounded-xl p-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Historique</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
        >
          {isHistoryExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      </div>
      
      <div className="space-y-3 mt-4">
        {(isHistoryExpanded ? history : history.slice(0, 3)).map((entry, index) => (
          <div key={index} className="flex items-start space-x-3">
            <History size={16} className="mt-0.5 text-muted-foreground" />
            <div>
              <p className="text-sm">{entry.action}</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(entry.date)} • {entry.user}
              </p>
            </div>
          </div>
        ))}
        
        {!isHistoryExpanded && history.length > 3 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-xs"
            onClick={() => setIsHistoryExpanded(true)}
          >
            Voir tout l'historique <ChevronDown size={14} className="ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
};
