
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const RoleHeader: React.FC = () => {
  return (
    <CardHeader>
      <CardTitle>Rôles disponibles</CardTitle>
      <CardDescription>
        Sélectionnez un rôle pour configurer ses permissions
      </CardDescription>
    </CardHeader>
  );
};

export default RoleHeader;
