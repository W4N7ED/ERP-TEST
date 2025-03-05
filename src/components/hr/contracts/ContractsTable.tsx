
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Contract } from './types';
import { statusBadgeVariants } from './constants';

interface ContractsTableProps {
  contracts: Contract[];
  canEditContract: boolean;
}

const ContractsTable = ({ contracts, canEditContract }: ContractsTableProps) => {
  return (
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
                <Badge variant={statusBadgeVariants[contract.status]}>
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
  );
};

export default ContractsTable;
