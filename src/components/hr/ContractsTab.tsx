
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePermissions } from '@/hooks/usePermissions';
import { FileText, DollarSign, FileUp } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Mock contracts data
const mockContracts = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'Jean Dupont',
    type: 'CDI',
    startDate: '2020-05-15',
    department: 'Maintenance',
    position: 'Technicien',
    grossSalary: 3200,
    status: 'active'
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: 'Marie Martin',
    type: 'CDI',
    startDate: '2018-03-10',
    department: 'RH',
    position: 'Responsable RH',
    grossSalary: 3800,
    status: 'active'
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: 'Pierre Durand',
    type: 'CDD',
    startDate: '2021-07-05',
    endDate: '2022-07-04',
    department: 'Ventes',
    position: 'Commercial',
    grossSalary: 2900,
    status: 'expired'
  }
];

const ContractsTab = () => {
  const { hasPermission } = usePermissions();
  const [contracts, setContracts] = useState(mockContracts);
  
  const canAddContract = hasPermission('hr.contracts.add');
  const canEditContract = hasPermission('hr.contracts.edit');

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Contrats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{contracts.filter(c => c.status === 'active').length}</div>
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
      
      <div className="flex justify-end mb-6 gap-4">
        {canAddContract && (
          <Button>
            Nouveau contrat
          </Button>
        )}
        {canEditContract && (
          <Button variant="outline">
            Générer les fiches de paie
          </Button>
        )}
      </div>
      
      <div className="bg-white rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employé</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Département</TableHead>
              <TableHead>Poste</TableHead>
              <TableHead>Date de début</TableHead>
              <TableHead>Date de fin</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell className="font-medium">{contract.employeeName}</TableCell>
                <TableCell>{contract.type}</TableCell>
                <TableCell>{contract.department}</TableCell>
                <TableCell>{contract.position}</TableCell>
                <TableCell>{new Date(contract.startDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  {contract.endDate 
                    ? new Date(contract.endDate).toLocaleDateString() 
                    : <span className="text-muted-foreground">N/A</span>}
                </TableCell>
                <TableCell>
                  <Badge variant={contract.status === 'active' ? 'default' : 'secondary'}>
                    {contract.status === 'active' ? 'Actif' : 'Expiré'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      Détails
                    </Button>
                    {canEditContract && (
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ContractsTab;
