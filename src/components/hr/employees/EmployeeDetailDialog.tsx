
import React, { useState } from 'react';
import { Employee } from '@/types/hr';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Edit, Mail, Phone, MapPin, Info, FileText, Calendar, FileSignature, User } from 'lucide-react';
import EmployeeDocuments from './tabs/EmployeeDocuments';
import EmployeePermissions from './tabs/EmployeePermissions';

interface EmployeeDetailDialogProps {
  employee: Employee;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (id: number, data: Partial<Employee>) => Promise<void>;
}

const EmployeeDetailDialog: React.FC<EmployeeDetailDialogProps> = ({
  employee,
  isOpen,
  onOpenChange,
  onUpdate
}) => {
  const [activeTab, setActiveTab] = useState("info");
  
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
  
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Fiche employé</DialogTitle>
            <Button variant="outline" size="icon">
              <Edit size={16} />
              <span className="sr-only">Modifier</span>
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex flex-col md:flex-row gap-6 p-2">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={employee.photoUrl} />
              <AvatarFallback className="text-2xl">
                {getInitials(employee.firstName, employee.lastName)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-xl font-bold">{`${employee.firstName} ${employee.lastName}`}</h3>
              <p className="text-muted-foreground">{employee.jobTitle}</p>
              <div className="mt-2">{getStatusBadge(employee.status)}</div>
            </div>
          </div>
          
          <div className="flex-1">
            <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="info">
                  <Info size={16} className="mr-2" />
                  Informations
                </TabsTrigger>
                <TabsTrigger value="documents">
                  <FileText size={16} className="mr-2" />
                  Documents
                </TabsTrigger>
                <TabsTrigger value="planning">
                  <Calendar size={16} className="mr-2" />
                  Planning
                </TabsTrigger>
                <TabsTrigger value="permissions">
                  <User size={16} className="mr-2" />
                  Accès ERP
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Département</p>
                    <p className="font-medium">{employee.department}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Date d'embauche</p>
                    <p className="font-medium">
                      {format(new Date(employee.hireDate), 'dd MMMM yyyy', { locale: fr })}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Contact</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center">
                      <Mail size={16} className="mr-2 text-muted-foreground" />
                      <span>{employee.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone size={16} className="mr-2 text-muted-foreground" />
                      <span>{employee.phone}</span>
                    </div>
                    {employee.address && (
                      <div className="flex items-start">
                        <MapPin size={16} className="mr-2 mt-1 text-muted-foreground" />
                        <span>{employee.address}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {employee.emergencyContact && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Contact d'urgence</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center">
                        <User size={16} className="mr-2 text-muted-foreground" />
                        <span>{employee.emergencyContact.name} ({employee.emergencyContact.relationship})</span>
                      </div>
                      <div className="flex items-center">
                        <Phone size={16} className="mr-2 text-muted-foreground" />
                        <span>{employee.emergencyContact.phone}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {employee.notes && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Notes</h4>
                    <p className="text-sm">{employee.notes}</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="documents">
                <EmployeeDocuments employee={employee} />
              </TabsContent>
              
              <TabsContent value="planning">
                <div className="flex flex-col items-center justify-center h-32 border rounded-md bg-muted/40">
                  <Calendar size={32} className="text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Planning non disponible
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="permissions">
                <EmployeePermissions employee={employee} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDetailDialog;
