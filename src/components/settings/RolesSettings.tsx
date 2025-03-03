
import RoleManagement from "@/components/settings/RoleManagement";
import { usePermissions } from "@/hooks/usePermissions";

const RolesSettings = () => {
  const { 
    availableRoles, 
    availablePermissions, 
    updateRoles, 
    updateRolePermissions 
  } = usePermissions();

  return (
    <RoleManagement 
      availableRoles={availableRoles}
      availablePermissions={availablePermissions}
      onUpdateRoles={updateRoles}
      onUpdatePermissions={updateRolePermissions}
    />
  );
};

export default RolesSettings;
