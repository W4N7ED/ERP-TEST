
import { usePermissions } from "@/hooks/usePermissions";
import { toast } from "sonner";

export const useUserPermissions = () => {
  const { currentUser, hasPermission, switchUser, availableUsers } = usePermissions();

  const handleUserChange = (userId: string) => {
    switchUser(Number(userId));
    toast.info(`Utilisateur changé pour: ${availableUsers.find(u => u.id === Number(userId))?.name}`);
  };

  return {
    currentUser,
    availableUsers,
    hasPermission,
    handleUserChange
  };
};
