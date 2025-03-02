
import React from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "lucide-react";

interface ConnectedAccount {
  id: string;
  provider: string;
  email: string;
  connected: boolean;
  icon: React.ReactNode;
}

interface ConnectedAccountsListProps {
  accounts: ConnectedAccount[];
  toggleConnection: (id: string) => void;
}

const ConnectedAccountsList: React.FC<ConnectedAccountsListProps> = ({ 
  accounts, 
  toggleConnection 
}) => {
  return (
    <div className="space-y-4">
      {accounts.map(account => (
        <div key={account.id} className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center space-x-3">
            {account.icon}
            <div>
              <h4 className="text-sm font-medium">{account.provider}</h4>
              <p className="text-xs text-muted-foreground">
                {account.email}
              </p>
            </div>
          </div>
          <Button 
            variant={account.connected ? "outline" : "default"} 
            size="sm" 
            onClick={() => toggleConnection(account.id)}
          >
            {account.connected ? "Déconnecter" : "Connecter"}
          </Button>
        </div>
      ))}
      
      <Button variant="outline" className="w-full">
        <Link className="h-4 w-4 mr-2" />
        Connecter un autre compte
      </Button>
    </div>
  );
};

export default ConnectedAccountsList;
