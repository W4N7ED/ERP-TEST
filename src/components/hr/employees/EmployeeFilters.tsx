
import React from 'react';
import { EmployeeFilters as EmployeeFiltersType, Department } from '@/types/hr';
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from 'lucide-react';

interface EmployeeFiltersProps {
  filters: EmployeeFiltersType;
  setFilters: React.Dispatch<React.SetStateAction<EmployeeFiltersType>>;
}

const EmployeeFilters: React.FC<EmployeeFiltersProps> = ({ filters, setFilters }) => {
  const departments: Department[] = [
    'Technique',
    'Administration',
    'Commercial',
    'Finance',
    'Direction',
    'Support'
  ];
  
  const statuses: Array<EmployeeFiltersType['status']> = [
    'active',
    'onLeave',
    'terminated'
  ];
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
  };
  
  const handleDepartmentChange = (value: string) => {
    setFilters(prev => ({ 
      ...prev, 
      department: value ? value as Department : undefined 
    }));
  };
  
  const handleStatusChange = (value: string) => {
    setFilters(prev => ({ 
      ...prev, 
      status: value ? value as EmployeeFiltersType['status'] : undefined 
    }));
  };
  
  return (
    <div className="bg-muted/40 p-4 rounded-lg">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Rechercher un employé..."
            value={filters.searchQuery || ''}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
        
        <Select
          value={filters.department || ''}
          onValueChange={handleDepartmentChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filtrer par département" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tous les départements</SelectItem>
            {departments.map(dept => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select
          value={filters.status || ''}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tous les statuts</SelectItem>
            <SelectItem value="active">Actif</SelectItem>
            <SelectItem value="onLeave">En congé</SelectItem>
            <SelectItem value="terminated">Terminé</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default EmployeeFilters;
