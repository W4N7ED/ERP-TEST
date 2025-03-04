
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Intervention, InterventionFilters } from "@/types/intervention";

export const useInterventionState = () => {
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInterventions, setFilteredInterventions] = useState<Intervention[]>([]);
  const [isNewInterventionDialogOpen, setIsNewInterventionDialogOpen] = useState(false);
  const [isEditInterventionDialogOpen, setIsEditInterventionDialogOpen] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [currentIntervention, setCurrentIntervention] = useState<Partial<Intervention>>({
    priority: "Moyenne",
    status: "À planifier",
    type: "Panne",
    creationMode: "Manuelle"
  });
  const [filters, setFilters] = useState<InterventionFilters>({
    status: null,
    priority: null,
    type: null,
    dateStart: null,
    dateEnd: null,
    technician: null,
    client: null,
    keyword: ""
  });
  const { toast } = useToast();
  
  // Load interventions from an API in a real implementation
  useEffect(() => {
    // This would be replaced with an API call in production
    setInterventions([]);
  }, []);
  
  useEffect(() => {
    applyFilters();
  }, [filters, searchTerm, showArchived, interventions]);

  const applyFilters = () => {
    let filtered = [...interventions];
    
    if (!showArchived) {
      filtered = filtered.filter(i => i.status !== "Archivée");
    }
    
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(intervention => 
        intervention.title.toLowerCase().includes(term) ||
        intervention.client.toLowerCase().includes(term) ||
        intervention.technician.toLowerCase().includes(term) ||
        (intervention.material && intervention.material.toLowerCase().includes(term)) ||
        (intervention.description && intervention.description.toLowerCase().includes(term))
      );
    }
    
    if (filters.status && filters.status !== "Tous") {
      filtered = filtered.filter(i => i.status === filters.status);
    }
    
    if (filters.priority && filters.priority !== "Tous") {
      filtered = filtered.filter(i => i.priority === filters.priority);
    }
    
    if (filters.type && filters.type !== "Tous") {
      filtered = filtered.filter(i => i.type === filters.type);
    }
    
    if (filters.technician) {
      filtered = filtered.filter(i => i.technician === filters.technician);
    }
    
    if (filters.client) {
      filtered = filtered.filter(i => i.client === filters.client);
    }
    
    if (filters.dateStart) {
      const startDate = new Date(filters.dateStart);
      startDate.setHours(0, 0, 0, 0);
      filtered = filtered.filter(i => {
        const date = new Date(i.dateCreated);
        return date >= startDate;
      });
    }
    
    if (filters.dateEnd) {
      const endDate = new Date(filters.dateEnd);
      endDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(i => {
        const date = new Date(i.dateCreated);
        return date <= endDate;
      });
    }
    
    setFilteredInterventions(filtered);
  };
  
  const resetFilters = () => {
    setFilters({
      status: null,
      priority: null,
      type: null,
      dateStart: null,
      dateEnd: null,
      technician: null,
      client: null,
      keyword: ""
    });
    setSearchTerm("");
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
  };
  
  const toggleArchivedView = () => {
    setShowArchived(!showArchived);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentIntervention(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setCurrentIntervention(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateIntervention = () => {
    if (!currentIntervention.title || !currentIntervention.client || !currentIntervention.technician) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would call an API to create the intervention
    const newIntervention: Intervention = {
      ...(currentIntervention as Intervention),
      id: interventions.length ? Math.max(...interventions.map(i => i.id)) + 1 : 1,
      dateCreated: new Date().toISOString().split('T')[0],
      deadline: currentIntervention.deadline || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setInterventions(prev => [...prev, newIntervention]);
    setFilteredInterventions(prev => showArchived ? [...prev, newIntervention] : 
      newIntervention.status !== "Archivée" ? [...prev, newIntervention] : prev);
    
    setCurrentIntervention({
      priority: "Moyenne",
      status: "À planifier",
      type: "Panne",
      creationMode: "Manuelle"
    });
    setIsNewInterventionDialogOpen(false);

    toast({
      title: "Intervention créée",
      description: `L'intervention #${newIntervention.id} a été créée avec succès`,
    });
  };

  const handleEditIntervention = (intervention: Intervention) => {
    setCurrentIntervention({ ...intervention });
    setIsEditInterventionDialogOpen(true);
  };

  const handleUpdateIntervention = () => {
    if (!currentIntervention.title || !currentIntervention.client || !currentIntervention.technician) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    const index = interventions.findIndex(i => i.id === currentIntervention.id);
    if (index === -1) {
      toast({
        title: "Erreur",
        description: "Intervention non trouvée",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would call an API to update the intervention
    const updatedInterventions = [...interventions];
    updatedInterventions[index] = { ...updatedInterventions[index], ...currentIntervention as Intervention };
    setInterventions(updatedInterventions);
    
    setFilteredInterventions(showArchived ? 
      updatedInterventions : 
      updatedInterventions.filter(i => i.status !== "Archivée"));
    
    setIsEditInterventionDialogOpen(false);

    toast({
      title: "Intervention mise à jour",
      description: `L'intervention #${currentIntervention.id} a été mise à jour`,
    });
  };

  const handleArchiveIntervention = (intervention: Intervention) => {
    if (window.confirm(`Êtes-vous sûr de vouloir archiver l'intervention "${intervention.title}" ?`)) {
      const index = interventions.findIndex(i => i.id === intervention.id);
      if (index !== -1) {
        // In a real app, this would call an API to archive the intervention
        const updatedInterventions = [...interventions];
        updatedInterventions[index] = {
          ...updatedInterventions[index],
          status: "Archivée",
          archived: true
        };
        
        setInterventions(updatedInterventions);
        setFilteredInterventions(showArchived ? 
          updatedInterventions : 
          updatedInterventions.filter(i => i.status !== "Archivée"));
        
        toast({
          title: "Intervention archivée",
          description: `L'intervention #${intervention.id} a été archivée`,
        });
      }
    }
  };

  const linkToProject = (projectId: number) => {
    toast({
      title: "Navigation vers le projet",
      description: `Redirection vers le projet #${projectId}`,
    });
  };

  return {
    searchTerm,
    filteredInterventions,
    isNewInterventionDialogOpen,
    isEditInterventionDialogOpen,
    showArchived,
    isAdvancedFiltersOpen,
    currentIntervention,
    filters,
    
    setIsNewInterventionDialogOpen,
    setIsEditInterventionDialogOpen,
    setIsAdvancedFiltersOpen,
    
    handleSearch,
    toggleArchivedView,
    resetFilters,
    handleInputChange,
    handleSelectChange,
    handleCreateIntervention,
    handleEditIntervention,
    handleUpdateIntervention,
    handleArchiveIntervention,
    linkToProject,
    applyFilters,
    setFilters
  };
};
