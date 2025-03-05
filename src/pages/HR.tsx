
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import EmployeesTab from '@/components/hr/employees/EmployeesTab';
import ContractsTab from '@/components/hr/contracts/ContractsTab';
import SchedulesTab from '@/components/hr/schedules/SchedulesTab';
import LeaveRequestsTab from '@/components/hr/leave/LeaveRequestsTab';
import PerformanceTab from '@/components/hr/performance/PerformanceTab';
import ReportsTab from '@/components/hr/reports/ReportsTab';
import { usePermissions } from '@/hooks/permissions';

const HRPage = () => {
  const [activeTab, setActiveTab] = useState("employees");
  const { hasPermission } = usePermissions();
  
  const canViewHr = hasPermission('users.view');
  
  if (!canViewHr) {
    return (
      <div className="container mx-auto py-10">
        <Card className="p-8">
          <h2 className="text-xl font-semibold mb-4">Accès non autorisé</h2>
          <p>Vous n'avez pas les permissions nécessaires pour accéder au module RH.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Ressources Humaines</h1>
          <p className="text-muted-foreground mt-1">Gestion des employés, contrats, congés et performances</p>
        </div>
      </div>

      <Tabs defaultValue="employees" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
          <TabsTrigger value="employees">Employés</TabsTrigger>
          <TabsTrigger value="contracts">Contrats & Paie</TabsTrigger>
          <TabsTrigger value="schedules">Plannings</TabsTrigger>
          <TabsTrigger value="leave">Congés</TabsTrigger>
          <TabsTrigger value="performance">Performances</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="employees">
          <EmployeesTab />
        </TabsContent>
        
        <TabsContent value="contracts">
          <ContractsTab />
        </TabsContent>
        
        <TabsContent value="schedules">
          <SchedulesTab />
        </TabsContent>
        
        <TabsContent value="leave">
          <LeaveRequestsTab />
        </TabsContent>
        
        <TabsContent value="performance">
          <PerformanceTab />
        </TabsContent>
        
        <TabsContent value="reports">
          <ReportsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRPage;
