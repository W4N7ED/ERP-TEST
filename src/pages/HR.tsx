
import { useState } from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EmployeesTab from '@/components/hr/EmployeesTab';
import ContractsTab from '@/components/hr/ContractsTab';
import PlanningTab from '@/components/hr/PlanningTab';
import LeavesTab from '@/components/hr/LeavesTab';
import PerformanceTab from '@/components/hr/PerformanceTab';
import ReportsTab from '@/components/hr/ReportsTab';

const HR = () => {
  const { hasPermission, currentUser } = usePermissions();
  const [activeTab, setActiveTab] = useState('employees');
  
  console.log("HR Page - Current User:", currentUser);
  console.log("HR Page - Has HR View Permission:", hasPermission('hr.view'));

  // Check for HR access permission
  if (!hasPermission('hr.view')) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-500">
            Vous n'avez pas les permissions nécessaires pour accéder au module RH.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Ressources Humaines</h1>
          <p className="text-muted-foreground mt-1">Gestion des employés, contrats, plannings et congés</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
              <TabsTrigger value="employees" disabled={!hasPermission('hr.employees.view')}>Employés</TabsTrigger>
              <TabsTrigger value="contracts" disabled={!hasPermission('hr.contracts.view')}>Contrats</TabsTrigger>
              <TabsTrigger value="planning" disabled={!hasPermission('hr.planning.view')}>Planning</TabsTrigger>
              <TabsTrigger value="leaves" disabled={!hasPermission('hr.leaves.view')}>Congés</TabsTrigger>
              <TabsTrigger value="performance" disabled={!hasPermission('hr.performance.view')}>Évaluations</TabsTrigger>
              <TabsTrigger value="reports" disabled={!hasPermission('hr.reports.view')}>Rapports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="employees">
              <EmployeesTab />
            </TabsContent>
            <TabsContent value="contracts">
              <ContractsTab />
            </TabsContent>
            <TabsContent value="planning">
              <PlanningTab />
            </TabsContent>
            <TabsContent value="leaves">
              <LeavesTab />
            </TabsContent>
            <TabsContent value="performance">
              <PerformanceTab />
            </TabsContent>
            <TabsContent value="reports">
              <ReportsTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default HR;
