
import { Employee } from '@/types/hr';
import { usePermissions } from '@/hooks/usePermissions';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Calendar, Building, Users, FileText } from 'lucide-react';

interface EmployeeDetailDialogProps {
  employee: Employee;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const EmployeeDetailDialog = ({ 
  employee, 
  isOpen, 
  onOpenChange 
}: EmployeeDetailDialogProps) => {
  const { hasPermission } = usePermissions();
  
  const calculateSeniority = (hireDate: string) => {
    const hire = new Date(hireDate);
    const now = new Date();
    
    let years = now.getFullYear() - hire.getFullYear();
    let months = now.getMonth() - hire.getMonth();
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    if (years === 0) {
      return `${months} mois`;
    } else if (months === 0) {
      return `${years} an${years > 1 ? 's' : ''}`;
    } else {
      return `${years} an${years > 1 ? 's' : ''} et ${months} mois`;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR').format(date);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img 
                src={employee.avatar || "https://via.placeholder.com/40"} 
                alt={`${employee.firstName} ${employee.lastName}`}
                className="h-full w-full object-cover"
              />
            </div>
            <span>{employee.firstName} {employee.lastName}</span>
          </DialogTitle>
          <DialogDescription>
            {employee.position} - {employee.department}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="profile" className="mt-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="access">Accès</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Informations personnelles</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <dt className="w-8"><Mail className="h-4 w-4 text-muted-foreground" /></dt>
                      <dd><a href={`mailto:${employee.email}`} className="text-blue-600 hover:underline">{employee.email}</a></dd>
                    </div>
                    <div className="flex items-center">
                      <dt className="w-8"><Phone className="h-4 w-4 text-muted-foreground" /></dt>
                      <dd><a href={`tel:${employee.phone}`} className="text-blue-600 hover:underline">{employee.phone}</a></dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Informations professionnelles</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <dt className="w-8"><Building className="h-4 w-4 text-muted-foreground" /></dt>
                      <dd>{employee.position}</dd>
                    </div>
                    <div className="flex items-center">
                      <dt className="w-8"><Users className="h-4 w-4 text-muted-foreground" /></dt>
                      <dd>{employee.department}</dd>
                    </div>
                    <div className="flex items-center">
                      <dt className="w-8"><Calendar className="h-4 w-4 text-muted-foreground" /></dt>
                      <dd>Embauché le {formatDate(employee.hireDate)}</dd>
                    </div>
                    <div className="flex items-center">
                      <dt className="w-8"></dt>
                      <dd>Ancienneté: {calculateSeniority(employee.hireDate)}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="access">
            <Card>
              <CardHeader>
                <CardTitle>Accès système</CardTitle>
                <CardDescription>
                  Rôle et permissions dans l'application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Rôle</h4>
                    <Badge className="mr-2">{employee.role}</Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Permissions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <Badge variant="outline" className="justify-start">Selon son rôle</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>
                  Documents associés à l'employé
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span>Contrat de travail</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Télécharger
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span>Dernière fiche de paie</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Télécharger
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span>Attestation de formation</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Télécharger
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDetailDialog;
