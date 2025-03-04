
import React from 'react';
import { CardFooter } from "@/components/ui/card";

interface PermissionsFooterProps {
  isAdmin: boolean;
}

const PermissionsFooter: React.FC<PermissionsFooterProps> = ({ isAdmin }) => {
  return (
    <CardFooter>
      <p className="text-sm text-gray-500">
        {isAdmin 
          ? "Le rôle Administrateur a toutes les permissions par défaut et ne peut pas être modifié." 
          : "Les modifications des permissions sont enregistrées automatiquement."}
      </p>
    </CardFooter>
  );
};

export default PermissionsFooter;
