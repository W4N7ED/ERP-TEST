
import React from 'react';
import { Label } from "@/components/ui/label";
import { CustomButton } from "@/components/ui/custom-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, X } from 'lucide-react';
import { InterventionFilters } from '@/types/intervention';
import { techniciansList, clientsList } from '@/data/interventionsMock';

interface AdvancedFiltersProps {
  isAdvancedFiltersOpen: boolean;
  setIsAdvancedFiltersOpen: (open: boolean) => void;
  filters: InterventionFilters;
  setFilters: (filters: InterventionFilters) => void;
  resetFilters: () => void;
  applyFilters: () => void;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  isAdvancedFiltersOpen,
  setIsAdvancedFiltersOpen,
  filters,
  setFilters,
  resetFilters,
  applyFilters
}) => {
  if (!isAdvancedFiltersOpen) return null;

  return (
    <div className="card-glass rounded-xl p-5 mb-6">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-medium">Filtres avancés</h3>
        <CustomButton 
          variant="ghost" 
          size="sm" 
          className="h-7 w-7 p-0" 
          onClick={() => setIsAdvancedFiltersOpen(false)}
        >
          <X size={18} />
        </CustomButton>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <div className="space-y-2">
          <Label>Statut</Label>
          <Select
            value={filters.status || ""}
            onValueChange={(value) => setFilters({...filters, status: value as any})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tous">Tous</SelectItem>
              <SelectItem value="À planifier">À planifier</SelectItem>
              <SelectItem value="Planifiée">Planifiée</SelectItem>
              <SelectItem value="En cours">En cours</SelectItem>
              <SelectItem value="En attente">En attente</SelectItem>
              <SelectItem value="Terminée">Terminée</SelectItem>
              <SelectItem value="Annulée">Annulée</SelectItem>
              <SelectItem value="Archivée">Archivée</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Priorité</Label>
          <Select
            value={filters.priority || ""}
            onValueChange={(value) => setFilters({...filters, priority: value as any})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Toutes les priorités" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tous">Toutes</SelectItem>
              <SelectItem value="Basse">Basse</SelectItem>
              <SelectItem value="Moyenne">Moyenne</SelectItem>
              <SelectItem value="Haute">Haute</SelectItem>
              <SelectItem value="Critique">Critique</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Type</Label>
          <Select
            value={filters.type || ""}
            onValueChange={(value) => setFilters({...filters, type: value as any})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tous les types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tous">Tous</SelectItem>
              <SelectItem value="Panne">Panne</SelectItem>
              <SelectItem value="Installation">Installation</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
              <SelectItem value="Mise à jour">Mise à jour</SelectItem>
              <SelectItem value="Autre">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Technicien</Label>
          <Select
            value={filters.technician || ""}
            onValueChange={(value) => setFilters({...filters, technician: value || null})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tous les techniciens" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous</SelectItem>
              {techniciansList.map(tech => (
                <SelectItem key={tech} value={tech}>{tech}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Client</Label>
          <Select
            value={filters.client || ""}
            onValueChange={(value) => setFilters({...filters, client: value || null})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tous les clients" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous</SelectItem>
              {clientsList.map(client => (
                <SelectItem key={client} value={client}>{client}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Date début</Label>
          <Popover>
            <PopoverTrigger asChild>
              <CustomButton
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dateStart ? (
                  format(filters.dateStart, "dd/MM/yyyy")
                ) : (
                  <span>Sélectionner...</span>
                )}
              </CustomButton>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.dateStart || undefined}
                onSelect={(date) => setFilters({...filters, dateStart: date})}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label>Date fin</Label>
          <Popover>
            <PopoverTrigger asChild>
              <CustomButton
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dateEnd ? (
                  format(filters.dateEnd, "dd/MM/yyyy")
                ) : (
                  <span>Sélectionner...</span>
                )}
              </CustomButton>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.dateEnd || undefined}
                onSelect={(date) => setFilters({...filters, dateEnd: date})}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="flex gap-2 justify-end">
        <CustomButton variant="outline" onClick={resetFilters}>
          Réinitialiser
        </CustomButton>
        <CustomButton variant="primary" onClick={applyFilters}>
          Appliquer
        </CustomButton>
      </div>
    </div>
  );
};

export default AdvancedFilters;
