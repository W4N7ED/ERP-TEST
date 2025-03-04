
import React from 'react';
import { Input } from "@/components/ui/input";
import { CustomButton } from "@/components/ui/custom-button";
import { Search, Filter, SortAsc, Tag, X } from 'lucide-react';
import type { InterventionFilters as InterventionFiltersType } from '@/types/intervention';

interface InterventionFiltersProps {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isAdvancedFiltersOpen: boolean;
  setIsAdvancedFiltersOpen: (open: boolean) => void;
  filters: InterventionFiltersType;
}

const InterventionFilters: React.FC<InterventionFiltersProps> = ({
  searchTerm,
  handleSearch,
  isAdvancedFiltersOpen,
  setIsAdvancedFiltersOpen,
  filters
}) => {
  const hasActiveFilters = Object.values(filters).some(v => v !== null && v !== "") || searchTerm;

  return (
    <div className="card-glass rounded-xl mb-8">
      <div className="p-5 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Rechercher une intervention..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <CustomButton 
              variant={isAdvancedFiltersOpen ? "primary" : "outline"} 
              icon={<Filter size={16} />}
              onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}
            >
              Filtrer
            </CustomButton>
            <CustomButton variant="outline" icon={<SortAsc size={16} />}>
              Trier
            </CustomButton>
            <CustomButton 
              variant="outline" 
              icon={<Tag size={16} />}
              className={hasActiveFilters ? "bg-primary/5 border-primary text-primary" : ""}
            >
              {hasActiveFilters ? "Filtres actifs" : "Filtres"}
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterventionFilters;
