
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePermissions } from '@/hooks/usePermissions';
import { CalendarOff, CalendarCheck, BadgeCheck } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LeaveRequest } from '@/types/hr';

// Extend the LeaveRequest interface to include employee name
type LeaveRequestWithName = Omit<LeaveRequest, 'approvedBy'> & {
  employeeName: string;
  approvedBy?: string | number;
};

// Mock leave requests data
const mockLeaveRequests: LeaveRequestWithName[] = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'Jean Dupont',
    type: 'annual',
    startDate: '2023-05-10',
    endDate: '2023-05-15',
    reason: 'Congés annuels',
    status: 'approved',
    approvedBy: 'Marie Martin'
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: 'Marie Martin',
    type: 'sick',
    startDate: '2023-06-01',
    endDate: '2023-06-03',
    reason: 'Maladie',
    status: 'approved',
    approvedBy: 'Admin'
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: 'Pierre Durand',
    type: 'annual',
    startDate: '2023-07-20',
    endDate: '2023-07-31',
    reason: 'Vacances d\'été',
    status: 'pending'
  },
  {
    id: 4,
    employeeId: 1,
    employeeName: 'Jean Dupont',
    type: 'family',
    startDate: '2023-08-05',
    endDate: '2023-08-07',
    reason: 'Évènement familial',
    status: 'pending'
  },
  {
    id: 5,
    employeeId: 2,
    employeeName: 'Marie Martin',
    type: 'other',
    startDate: '2023-09-15',
    endDate: '2023-09-15',
    halfDay: true,
    reason: 'Rendez-vous personnel',
    status: 'pending'
  }
];

const typeLabels: Record<string, string> = {
  annual: 'Congés annuels',
  sick: 'Maladie',
  family: 'Familial',
  unpaid: 'Sans solde',
  other: 'Autre'
};

// Define allowed badge variants to match the UI component
const statusBadgeVariants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  approved: 'default',
  pending: 'secondary',
  rejected: 'destructive'
};

const LeavesTab = () => {
  const { hasPermission } = usePermissions();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequestWithName[]>(mockLeaveRequests);
  
  const canAddLeave = hasPermission('hr.leaves.add');
  const canApproveLeave = hasPermission('hr.leaves.approve');

  const handleApproveLeave = (id: number) => {
    setLeaveRequests(leaveRequests.map(request => 
      request.id === id 
        ? { ...request, status: 'approved', approvedBy: 'Admin' } as LeaveRequestWithName
        : request
    ));
  };

  const handleRejectLeave = (id: number) => {
    setLeaveRequests(leaveRequests.map(request => 
      request.id === id 
        ? { ...request, status: 'rejected' } as LeaveRequestWithName
        : request
    ));
  };

  const pendingRequests = leaveRequests.filter(r => r.status === 'pending');
  const approvedRequests = leaveRequests.filter(r => r.status === 'approved');
  const currentlyAbsent = leaveRequests.filter(r => 
    r.status === 'approved' && 
    new Date(r.startDate) <= new Date() && 
    new Date(r.endDate) >= new Date()
  );

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CalendarCheck className="mr-2 h-5 w-5 text-primary" />
              Demandes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingRequests.length}</div>
            <p className="text-sm text-muted-foreground">Demandes en attente</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BadgeCheck className="mr-2 h-5 w-5 text-primary" />
              Approuvées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{approvedRequests.length}</div>
            <p className="text-sm text-muted-foreground">Ce trimestre</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CalendarOff className="mr-2 h-5 w-5 text-primary" />
              Absences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{currentlyAbsent.length}</div>
            <p className="text-sm text-muted-foreground">Actuellement absents</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end mb-6 gap-4">
        {canAddLeave && (
          <Button>
            Nouvelle demande
          </Button>
        )}
        {canApproveLeave && pendingRequests.length > 0 && (
          <Button variant="outline">
            Gérer les demandes
          </Button>
        )}
      </div>
      
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
                          onClick={() => handleApproveLeave(request.id)}
                        >
                          Approuver
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRejectLeave(request.id)}
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
    </div>
  );
};

export default LeavesTab;
