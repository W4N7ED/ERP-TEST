
import { useState } from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import { Contract, mockContracts } from './contracts/types';
import ContractStatsCards from './contracts/ContractStatsCards';
import ContractActions from './contracts/ContractActions';
import ContractsTable from './contracts/ContractsTable';

const ContractsTab = () => {
  const { hasPermission } = usePermissions();
  const [contracts, setContracts] = useState<Contract[]>(mockContracts);
  
  const canAddContract = hasPermission('hr.contracts.add');
  const canEditContract = hasPermission('hr.contracts.edit');

  return (
    <div className="p-6">
      <ContractStatsCards contracts={contracts} />
      
      <ContractActions 
        canAddContract={canAddContract}
        canEditContract={canEditContract}
      />
      
      <ContractsTable 
        contracts={contracts}
        canEditContract={canEditContract}
      />
    </div>
  );
};

export default ContractsTab;
