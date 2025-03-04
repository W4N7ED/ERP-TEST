
import React from 'react';
import { AlertTriangle, Clock, CheckCircle2, Archive } from 'lucide-react';
import { interventionsMock } from '@/data/interventionsMock';

const InterventionStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="card-glass rounded-xl p-4 flex items-center">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          <AlertTriangle className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">En cours</p>
          <h3 className="text-2xl font-bold">
            {interventionsMock.filter(i => i.status === "En cours").length}
          </h3>
        </div>
      </div>
      
      <div className="card-glass rounded-xl p-4 flex items-center">
        <div className="bg-amber-100 p-3 rounded-full mr-4">
          <Clock className="h-6 w-6 text-amber-600" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">À planifier/En attente</p>
          <h3 className="text-2xl font-bold">
            {interventionsMock.filter(i => ["À planifier", "En attente"].includes(i.status)).length}
          </h3>
        </div>
      </div>
      
      <div className="card-glass rounded-xl p-4 flex items-center">
        <div className="bg-green-100 p-3 rounded-full mr-4">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Terminées</p>
          <h3 className="text-2xl font-bold">
            {interventionsMock.filter(i => i.status === "Terminée").length}
          </h3>
        </div>
      </div>
      
      <div className="card-glass rounded-xl p-4 flex items-center">
        <div className="bg-gray-100 p-3 rounded-full mr-4">
          <Archive className="h-6 w-6 text-gray-600" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Archivées</p>
          <h3 className="text-2xl font-bold">
            {interventionsMock.filter(i => i.status === "Archivée").length}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default InterventionStats;
