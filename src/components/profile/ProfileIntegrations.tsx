
import React, { useState } from 'react';
import IntegrationsCard from './integrations/IntegrationsCard';
import ConnectedAccountsList from './integrations/ConnectedAccountsList';
import CalendarSync from './integrations/CalendarSync';
import AccountManagement from './integrations/AccountManagement';
import { toast } from "sonner";

interface ConnectedAccount {
  id: string;
  provider: string;
  email: string;
  connected: boolean;
  icon: React.ReactNode;
}

const ProfileIntegrations: React.FC = () => {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([
    {
      id: '1',
      provider: 'Google',
      email: 'utilisateur@gmail.com',
      connected: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
          <path d="M22 12.5v-2a10 10 0 0 0-20 0v2a10 10 0 0 0 20 0Z" />
          <path d="M13 12.52v4a2.5 2.5 0 0 1-5 0v-4" />
          <path d="M7 3c0 1.2.5 2 1.5 2S10 4.2 10 3" />
          <path d="M14 3c0 1.2.5 2 1.5 2S17 4.2 17 3" />
        </svg>
      )
    },
    {
      id: '2',
      provider: 'Microsoft',
      email: 'utilisateur@outlook.com',
      connected: false,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      )
    }
  ]);
  
  const [calendarSync, setCalendarSync] = useState<boolean>(true);
  
  const toggleConnection = (id: string) => {
    setAccounts(prev => prev.map(account => {
      if (account.id === id) {
        const newState = !account.connected;
        toast.success(`Compte ${account.provider} ${newState ? 'connecté' : 'déconnecté'}`);
        return { ...account, connected: newState };
      }
      return account;
    }));
  };
  
  // Check if Google account is connected
  const isGoogleConnected = accounts.some(account => 
    account.provider === 'Google' && account.connected
  );
  
  return (
    <div className="space-y-6">
      <IntegrationsCard 
        title="Comptes connectés" 
        description="Gérez les services externes connectés à votre compte"
      >
        <ConnectedAccountsList 
          accounts={accounts} 
          toggleConnection={toggleConnection} 
        />
      </IntegrationsCard>
      
      <IntegrationsCard 
        title="Synchronisation du calendrier" 
        description="Synchronisez vos interventions et tâches avec votre calendrier"
      >
        <CalendarSync 
          calendarSync={calendarSync} 
          setCalendarSync={setCalendarSync} 
          googleConnected={isGoogleConnected}
        />
      </IntegrationsCard>
      
      <IntegrationsCard 
        title="Exportation et suppression de compte" 
        description="Gérez vos données personnelles et votre compte"
      >
        <AccountManagement />
      </IntegrationsCard>
    </div>
  );
};

export default ProfileIntegrations;
