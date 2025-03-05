
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LeaveRequestWithName } from './types';
import { typeLabels, statusBadgeVariants } from './constants';

interface LeaveRequestsTableProps {
  leaveRequests: LeaveRequestWithName[];
  canApproveLeave: boolean;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

const LeaveRequestsTable = ({ 
  leaveRequests, 
  canApproveLeave, 
  onApprove, 
  onReject 
}: LeaveRequestsTableProps) => {
  return (
    <div className="bg-white rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employé</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date de début</TableHead>
            <TableHead>Date de fin</TableHead>
            <TableHead>Raison</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Approuvé par</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaveRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">{request.employeeName}</TableCell>
              <TableCell>{typeLabels[request.type] || request.type}</TableCell>
              <TableCell>{new Date(request.startDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(request.endDate).toLocaleDateString()}</TableCell>
              <TableCell>{request.reason}</TableCell>
              <TableCell>
                <Badge variant={statusBadgeVariants[request.status]}>
                  {request.status === 'approved' ? 'Approuvé' : 
                   request.status === 'pending' ? 'En attente' : 'Refusé'}
                </Badge>
              </TableCell>
              <TableCell>{request.approvedBy || '-'}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {request.status === 'pending' && canApproveLeave && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onApprove(request.id)}
                      >
                        Approuver
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onReject(request.id)}
                      >
                        Refuser
                      </Button>
                    </>
                  )}
                  {request.status !== 'pending' && (
                    <Button variant="outline" size="sm">
                      Détails
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

export default LeaveRequestsTable;
