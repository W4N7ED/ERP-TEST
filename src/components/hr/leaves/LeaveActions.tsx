
import { Button } from '@/components/ui/button';

interface LeaveActionsProps {
  canAddLeave: boolean;
  canApproveLeave: boolean;
  pendingRequestsCount: number;
}

const LeaveActions = ({ 
  canAddLeave, 
  canApproveLeave, 
  pendingRequestsCount 
}: LeaveActionsProps) => {
  return (
    <div className="flex justify-end mb-6 gap-4">
      {canAddLeave && (
        <Button>
          Nouvelle demande
        </Button>
      )}
      {canApproveLeave && pendingRequestsCount > 0 && (
        <Button variant="outline">
          Gérer les demandes
        </Button>
      )}
    </div>
  );
};

export default LeaveActions;
