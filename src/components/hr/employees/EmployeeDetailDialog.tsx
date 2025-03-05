
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Employee } from "@/types/hr";
import { CalendarDays, Mail, Phone, Building, Briefcase, Award } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface EmployeeDetailDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee;
}

const EmployeeDetailDialog = ({
  isOpen,
  onOpenChange,
  employee,
}: EmployeeDetailDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Détails de l'employé</DialogTitle>
          <DialogDescription>
            Informations complètes sur {employee.firstName} {employee.lastName}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center mb-6 mt-4">
          <div className="flex-shrink-0 mr-4">
            {employee.avatar ? (
              <img
                src={employee.avatar}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-medium">
                {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold">{employee.firstName} {employee.lastName}</h3>
            <p className="text-muted-foreground">{employee.position}</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {employee.status === 'active' ? 'Actif' : 'Inactif'}
            </span>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="flex items-start">
            <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p>{employee.email}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Téléphone</p>
              <p>{employee.phone}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Building className="h-5 w-5 mr-2 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Département</p>
              <p>{employee.department}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CalendarDays className="h-5 w-5 mr-2 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Date d'embauche</p>
              <p>{new Date(employee.hireDate).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Briefcase className="h-5 w-5 mr-2 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Poste</p>
              <p>{employee.position}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Award className="h-5 w-5 mr-2 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Rôle</p>
              <p>{employee.role}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
          <Button>
            Modifier
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDetailDialog;
