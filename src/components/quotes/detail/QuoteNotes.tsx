
import React from "react";

interface QuoteNotesProps {
  notes?: string;
  terms?: string;
}

export const QuoteNotes: React.FC<QuoteNotesProps> = ({ notes, terms }) => {
  if (!notes && !terms) return null;
  
  return (
    <>
      {notes && (
        <div className="card-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">Notes</h3>
          <p className="text-muted-foreground">{notes}</p>
        </div>
      )}
      
      {terms && (
        <div className="card-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">Conditions générales</h3>
          <p className="text-muted-foreground">{terms}</p>
        </div>
      )}
    </>
  );
};
