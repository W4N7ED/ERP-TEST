
import React, { useState } from 'react';
import { Employee } from '@/types/hr';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Edit, 
  FileText, 
  MoreVertical, 
  Trash2, 
  UserCog, 
  Calendar, 
  FileSignature 
} from "lucide-react";
import { format, differenceInMonths, differenceInYears } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Skeleton } from "@/components/ui/skeleton";
import EmployeeDetailDialog from './EmployeeDetailDialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface EmployeesListProps {
  employees: Employee[];
  isLoading: boolean;
  onUpdate: (id: number, data: Partial<Employee>) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const EmployeesList: React.FC<EmployeesListProps> = ({ 
  employees, 
  isLoading,
  onUpdate,
  onDelete
}) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };
  
  const getStatusBadge = (status: Employee['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Actif</Badge>;
      case 'onLeave':
        return <Badge variant="outline">En congé</Badge>;
      case 'terminated':
        return <Badge variant="destructive">Terminé</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const formatSeniority = (hireDate: string) => {
    const date = new Date(hireDate);
    const years = differenceInYears(new Date(), date);
    const months = differenceInMonths(new Date(), date) % 12;
    
    if (years > 0) {
      return `${years} an${years > 1 ? 's' : ''} ${months > 0 ? `${months} mois` : ''}`;
    }
    return `${months} mois`;
  };
  
  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDetailDialogOpen(true);
  };
  
  const handleOpenDeleteDialog = (employee: Employee) => {
    setEmployeeToDelete(employee);
  };
  
  const handleConfirmDelete = async () => {
    if (employeeToDelete) {
      await onDelete(employeeToDelete.id);
      setEmployeeToDelete(null);
    }
  };
  
  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-8 w-full mb-4" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }
  
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employé</TableHead>
            <TableHead>Poste</TableHead>
            <TableHead>Département</TableHead>
            <TableHead>Date d'embauche</TableHead>
            <TableHead>Ancienneté</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                Aucun employé trouvé
              </TableCell>
            </TableRow>
          ) : (
            employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={employee.photoUrl} />
                      <AvatarFallback>{getInitials(employee.firstName, employee.lastName)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{`${employee.firstName} ${employee.lastName}`}</div>
                      <div className="text-sm text-muted-foreground">{employee.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{employee.jobTitle}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{format(new Date(employee.hireDate), 'dd MMM yyyy', { locale: fr })}</TableCell>
                <TableCell>{formatSeniority(employee.hireDate)}</TableCell>
                <TableCell>{getStatusBadge(employee.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical size={16} />
                        <span className="sr-only">Ouvrir le menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleViewDetails(employee)}>
                        <UserCog className="mr-2 h-4 w-4" />
                        Voir le détail
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Documents
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        Planning
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileSignature className="mr-2 h-4 w-4" />
                        Contrat
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleOpenDeleteDialog(employee)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      {selectedEmployee && (
        <EmployeeDetailDialog
          employee={selectedEmployee}
          isOpen={isDetailDialogOpen}
          onOpenChange={setIsDetailDialogOpen}
          onUpdate={onUpdate}
        />
      )}
      
      <AlertDialog open={!!employeeToDelete} onOpenChange={(open) => !open && setEmployeeToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer l'employé {employeeToDelete?.firstName} {employeeToDelete?.lastName} ?
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EmployeesList;
