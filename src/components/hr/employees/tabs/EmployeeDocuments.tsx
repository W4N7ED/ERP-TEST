
import React from 'react';
import { Employee } from '@/types/hr';
import { Button } from '@/components/ui/button';
import { FileText, Download, Upload, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface EmployeeDocumentsProps {
  employee: Employee;
}

const EmployeeDocuments: React.FC<EmployeeDocumentsProps> = ({ employee }) => {
  const documents = employee.documents || [];
  
  const getIconForDocumentType = (type: string) => {
    return <FileText size={20} />;
  };
  
  const handleUploadDocument = () => {
    // Implement document upload functionality
    console.log('Upload document');
  };
  
  const handleDownloadDocument = (documentId: number) => {
    // Implement document download functionality
    console.log('Download document', documentId);
  };
  
  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 border rounded-md bg-muted/40">
        <FileText size={32} className="text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground mb-4">
          Aucun document disponible pour cet employé
        </p>
        <Button variant="outline" size="sm" onClick={handleUploadDocument}>
          <Upload size={16} className="mr-2" />
          Ajouter un document
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Documents ({documents.length})</h3>
        <Button variant="outline" size="sm" onClick={handleUploadDocument}>
          <Plus size={16} className="mr-2" />
          Ajouter
        </Button>
      </div>
      
      <div className="space-y-2">
        {documents.map(doc => (
          <div 
            key={doc.id} 
            className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center">
              {getIconForDocumentType(doc.type)}
              <div className="ml-3">
                <p className="font-medium">{doc.name}</p>
                <p className="text-xs text-muted-foreground">
                  Ajouté le {format(new Date(doc.uploadDate), 'dd MMM yyyy', { locale: fr })}
                  {doc.expiryDate && ` • Expire le ${format(new Date(doc.expiryDate), 'dd MMM yyyy', { locale: fr })}`}
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => handleDownloadDocument(doc.id)}
            >
              <Download size={16} />
              <span className="sr-only">Télécharger</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDocuments;
