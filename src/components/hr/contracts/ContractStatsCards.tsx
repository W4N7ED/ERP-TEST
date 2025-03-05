
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, DollarSign, FileUp } from 'lucide-react';
import { Contract } from './types';

interface ContractStatsCardsProps {
  contracts: Contract[];
}

const ContractStatsCards = ({ contracts }: ContractStatsCardsProps) => {
  const activeContracts = contracts.filter(c => c.status === 'active').length;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <FileText className="mr-2 h-5 w-5 text-primary" />
            Contrats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{activeContracts}</div>
          <p className="text-sm text-muted-foreground">Contrats actifs</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-primary" />
            Fiches de paie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">128</div>
          <p className="text-sm text-muted-foreground">Générées ce mois-ci</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <FileUp className="mr-2 h-5 w-5 text-primary" />
            Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">87</div>
          <p className="text-sm text-muted-foreground">Documents stockés</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractStatsCards;
