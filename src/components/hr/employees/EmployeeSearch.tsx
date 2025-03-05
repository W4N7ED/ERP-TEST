
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface EmployeeSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const EmployeeSearch = ({ searchQuery, setSearchQuery }: EmployeeSearchProps) => {
  return (
    <div className="relative w-full sm:w-64">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Rechercher un employé..."
        className="pl-8"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default EmployeeSearch;
