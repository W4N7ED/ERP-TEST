
import React from "react";
import { CustomButton } from "@/components/ui/custom-button";

const OrderHistoryTab: React.FC = () => {
  return (
    <div className="bg-muted/20 rounded-lg p-5 text-center">
      <h3 className="text-lg font-medium mb-2">Historique des commandes</h3>
      <p className="text-muted-foreground mb-4">
        L'historique des commandes n'est pas encore disponible.
      </p>
      <CustomButton variant="outline">
        Configurer le suivi des commandes
      </CustomButton>
    </div>
  );
};

export default OrderHistoryTab;
