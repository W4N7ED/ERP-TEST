
import React from 'react';
import { useForm } from 'react-hook-form';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Employee, Department } from '@/types/hr';
import { usePermissions } from '@/hooks/permissions';
import { Textarea } from '@/components/ui/textarea';

interface AddEmployeeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddEmployee: (data: Omit<Employee, 'id'>) => Promise<void>;
}

const AddEmployeeDialog: React.FC<AddEmployeeDialogProps> = ({ 
  isOpen, 
  onOpenChange,
  onAddEmployee
}) => {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<Omit<Employee, 'id'>>();
  
  const { availableRoles } = usePermissions();
  
  const departments: Department[] = [
    'Technique',
    'Administration',
    'Commercial',
    'Finance',
    'Direction',
    'Support'
  ];
  
  const closeDialog = () => {
    reset();
    onOpenChange(false);
  };
  
  const onSubmit = async (data: Omit<Employee, 'id'>) => {
    await onAddEmployee(data);
    closeDialog();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ajouter un nouvel employé</DialogTitle>
          <DialogDescription>
            Remplissez les informations ci-dessous pour créer un nouvel employé.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom *</Label>
              <Input 
                id="firstName"
                {...register('firstName', { required: 'Le prénom est requis' })}
              />
              {errors.firstName && (
                <p className="text-sm text-destructive">{errors.firstName.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom *</Label>
              <Input 
                id="lastName"
                {...register('lastName', { required: 'Le nom est requis' })}
              />
              {errors.lastName && (
                <p className="text-sm text-destructive">{errors.lastName.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input 
                id="email"
                type="email"
                {...register('email', { 
                  required: 'L\'email est requis',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Veuillez entrer un email valide'
                  }
                })}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone *</Label>
              <Input 
                id="phone"
                {...register('phone', { required: 'Le téléphone est requis' })}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Poste *</Label>
              <Input 
                id="jobTitle"
                {...register('jobTitle', { required: 'Le poste est requis' })}
              />
              {errors.jobTitle && (
                <p className="text-sm text-destructive">{errors.jobTitle.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Département *</Label>
              <Select
                onValueChange={(value) => setValue('department', value as Department)}
                defaultValue=""
              >
                <SelectTrigger id="department">
                  <SelectValue placeholder="Sélectionner un département" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.department && (
                <p className="text-sm text-destructive">{errors.department.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Rôle dans l'ERP</Label>
              <Select
                onValueChange={(value) => setValue('role', value)}
                defaultValue=""
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Sélectionner un rôle (optionnel)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Aucun</SelectItem>
                  {availableRoles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hireDate">Date d'embauche *</Label>
              <Input 
                id="hireDate"
                type="date"
                {...register('hireDate', { required: 'La date d\'embauche est requise' })}
              />
              {errors.hireDate && (
                <p className="text-sm text-destructive">{errors.hireDate.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Statut *</Label>
              <Select
                onValueChange={(value) => setValue('status', value as Employee['status'])}
                defaultValue="active"
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="onLeave">En congé</SelectItem>
                  <SelectItem value="terminated">Terminé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Adresse</Label>
            <Textarea 
              id="address"
              {...register('address')}
              placeholder="Adresse complète"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes"
              {...register('notes')}
              placeholder="Notes additionnelles sur l'employé"
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={closeDialog}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer l'employé</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeDialog;
