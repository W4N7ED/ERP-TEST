
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface EmployeeActionsProps {
  canAddEmployee: boolean;
  onAddEmployeeClick: () => void;
}

const EmployeeActions = ({ canAddEmployee, onAddEmployeeClick }: EmployeeActionsProps) => {
  if (!canAddEmployee) return null;
  
  return (
    <Button 
      onClick={onAddEmployeeClick}
      className="whitespace-nowrap"
    >
      <Plus className="mr-2 h-4 w-4" />
      Ajouter un employé
    </Button>
  );
};

export default EmployeeActions;
