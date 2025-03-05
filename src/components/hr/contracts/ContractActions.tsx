
import { Button } from '@/components/ui/button';

interface ContractActionsProps {
  canAddContract: boolean;
  canEditContract: boolean;
}

const ContractActions = ({ 
  canAddContract, 
  canEditContract 
}: ContractActionsProps) => {
  return (
    <div className="flex justify-end mb-6 gap-4">
      {canAddContract && (
        <Button>
          Nouveau contrat
        </Button>
      )}
      {canEditContract && (
        <Button variant="outline">
          Générer les fiches de paie
        </Button>
      )}
    </div>
  );
};

export default ContractActions;
