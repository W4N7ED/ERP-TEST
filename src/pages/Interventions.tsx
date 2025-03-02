
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { CustomButton } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Search,
  Filter,
  SortAsc,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Wrench,
  FileText,
  Package,
  Users,
  Bell,
  Receipt,
  Settings,
  Archive,
  Edit,
  Eye,
  Link,
} from "lucide-react";

// Types pour les interventions
type Priority = "Critique" | "Haute" | "Moyenne" | "Basse";
type Status = "À planifier" | "Planifiée" | "En cours" | "En attente" | "Terminée" | "Annulée" | "Archivée";
type InterventionType = "Panne" | "Installation" | "Maintenance" | "Mise à jour" | "Autre";
type CreationMode = "Manuelle" | "Automatique" | "Ticket client";

interface Intervention {
  id: number;
  title: string;
  client: string;
  technician: string;
  status: Status;
  priority: Priority;
  type: InterventionType;
  dateCreated: string;
  deadline: string;
  scheduledDate?: string;
  creationMode: CreationMode;
  description?: string;
  material?: string;
  projectId?: number;
  notes?: string[];
  attachments?: string[];
  relatedTicket?: number;
  archived?: boolean;
}

// Mock data pour les interventions
const interventionsMock: Intervention[] = [
  { 
    id: 1, 
    title: "Remplacement disque SSD", 
    client: "Entreprise ABC", 
    technician: "Jean Dupont",
    status: "En cours", 
    priority: "Moyenne",
    type: "Panne",
    dateCreated: "2023-09-10", 
    deadline: "2023-09-17",
    scheduledDate: "2023-09-15",
    creationMode: "Manuelle",
    material: "PC Portable Dell XPS",
    description: "Client signale des lenteurs importantes et des erreurs de lecture/écriture",
    notes: ["Disque SSD 512Go commandé", "Prévoir sauvegarde des données"]
  },
  { 
    id: 2, 
    title: "Installation imprimante réseau", 
    client: "Société XYZ", 
    technician: "Marie Lambert",
    status: "Planifiée", 
    priority: "Basse",
    type: "Installation",
    dateCreated: "2023-09-12", 
    deadline: "2023-09-20",
    scheduledDate: "2023-09-18",
    creationMode: "Ticket client",
    relatedTicket: 3245,
    material: "Imprimante HP LaserJet",
    description: "Configuration de la nouvelle imprimante sur le réseau de l'entreprise"
  },
  { 
    id: 3, 
    title: "Maintenance serveur", 
    client: "Agence 123", 
    technician: "Alex Thibault",
    status: "Terminée", 
    priority: "Haute",
    type: "Maintenance",
    dateCreated: "2023-09-05", 
    deadline: "2023-09-14",
    scheduledDate: "2023-09-09",
    creationMode: "Automatique",
    material: "Serveur Dell PowerEdge",
    projectId: 2,
    description: "Maintenance trimestrielle planifiée",
    notes: ["Mise à jour firmware effectuée", "Nettoyage ventilateurs"]
  },
  { 
    id: 4, 
    title: "Dépannage réseau", 
    client: "Boutique DEF", 
    technician: "Claire Petit",
    status: "Terminée", 
    priority: "Critique",
    type: "Panne",
    dateCreated: "2023-09-08", 
    deadline: "2023-09-13",
    scheduledDate: "2023-09-08",
    creationMode: "Ticket client",
    relatedTicket: 3240,
    material: "Switch Cisco Catalyst",
    description: "Réseau totalement inaccessible, urgence commerciale",
    notes: ["Switch remplacé", "Configuration restaurée depuis sauvegarde"]
  },
  { 
    id: 5, 
    title: "Mise à jour des postes de travail", 
    client: "Cabinet GHI", 
    technician: "Jean Dupont",
    status: "En cours", 
    priority: "Moyenne",
    type: "Mise à jour",
    dateCreated: "2023-09-11", 
    deadline: "2023-09-18",
    scheduledDate: "2023-09-16",
    creationMode: "Manuelle",
    projectId: 1,
    material: "20 PC Dell Optiplex",
    description: "Migration Windows 10 vers Windows 11"
  },
  { 
    id: 6, 
    title: "Réparation serveur de données", 
    client: "Restaurant JKL", 
    technician: "Alex Thibault",
    status: "Annulée", 
    priority: "Critique",
    type: "Panne",
    dateCreated: "2023-09-09", 
    deadline: "2023-09-15",
    scheduledDate: "2023-09-10",
    creationMode: "Ticket client",
    relatedTicket: 3242,
    material: "NAS Synology",
    description: "Le client a trouvé une autre solution"
  },
  { 
    id: 7, 
    title: "Installation de postes de travail", 
    client: "Clinique MNO", 
    technician: "Marie Lambert",
    status: "À planifier", 
    priority: "Basse",
    type: "Installation",
    dateCreated: "2023-09-13", 
    deadline: "2023-09-25",
    creationMode: "Manuelle",
    material: "5 PC HP EliteDesk",
    description: "Installation et configuration de nouveaux postes"
  }
];

// Liste de techniciens pour l'attribution
const techniciansList = [
  "Jean Dupont",
  "Marie Lambert",
  "Alex Thibault",
  "Claire Petit",
  "Thomas Martin",
  "Sophie Bernard"
];

// Liste de clients pour la sélection
const clientsList = [
  "Entreprise ABC",
  "Société XYZ",
  "Agence 123",
  "Boutique DEF",
  "Cabinet GHI",
  "Restaurant JKL",
  "Clinique MNO"
];

const Interventions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInterventions, setFilteredInterventions] = useState<Intervention[]>(interventionsMock);
  const [isNewInterventionDialogOpen, setIsNewInterventionDialogOpen] = useState(false);
  const [isEditInterventionDialogOpen, setIsEditInterventionDialogOpen] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [currentIntervention, setCurrentIntervention] = useState<Partial<Intervention>>({
    priority: "Moyenne",
    status: "À planifier",
    type: "Panne",
    creationMode: "Manuelle"
  });
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setFilteredInterventions(showArchived ? interventionsMock : interventionsMock.filter(i => i.status !== "Archivée"));
    } else {
      const filtered = interventionsMock.filter(
        intervention => 
          (showArchived || intervention.status !== "Archivée") &&
          (intervention.title.toLowerCase().includes(term.toLowerCase()) ||
          intervention.client.toLowerCase().includes(term.toLowerCase()) ||
          intervention.technician.toLowerCase().includes(term.toLowerCase()) ||
          intervention.material?.toLowerCase().includes(term.toLowerCase()) ||
          intervention.description?.toLowerCase().includes(term.toLowerCase()))
      );
      setFilteredInterventions(filtered);
    }
  };
  
  const toggleArchivedView = () => {
    setShowArchived(!showArchived);
    if (!showArchived) {
      setFilteredInterventions(interventionsMock);
    } else {
      setFilteredInterventions(interventionsMock.filter(i => i.status !== "Archivée"));
    }
  };
  
  const getStatusIcon = (status: Status) => {
    switch(status) {
      case "À planifier": 
        return <Clock size={16} className="text-amber-500" />;
      case "Planifiée": 
        return <Calendar size={16} className="text-blue-400" />;
      case "En attente": 
        return <Clock size={16} className="text-amber-500" />;
      case "En cours":
        return <AlertTriangle size={16} className="text-blue-500" />;
      case "Terminée":
        return <CheckCircle2 size={16} className="text-green-500" />;
      case "Annulée":
        return <XCircle size={16} className="text-red-500" />;
      case "Archivée":
        return <Archive size={16} className="text-gray-500" />;
      default:
        return null;
    }
  };
  
  const getStatusClass = (status: Status) => {
    switch(status) {
      case "À planifier": return "bg-amber-100 text-amber-800";
      case "Planifiée": return "bg-blue-100 text-blue-800";
      case "En attente": return "bg-amber-100 text-amber-800";
      case "En cours": return "bg-blue-100 text-blue-800";
      case "Terminée": return "bg-green-100 text-green-800";
      case "Annulée": return "bg-red-100 text-red-800";
      case "Archivée": return "bg-gray-100 text-gray-800";
      default: return "";
    }
  };
  
  const getPriorityClass = (priority: Priority) => {
    switch(priority) {
      case "Basse": return "bg-gray-100 text-gray-700";
      case "Moyenne": return "bg-blue-100 text-blue-700";
      case "Haute": return "bg-amber-100 text-amber-700";
      case "Critique": return "bg-red-100 text-red-700";
      default: return "";
    }
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

    const newIntervention: Intervention = {
      ...(currentIntervention as Intervention),
      id: Math.max(...interventionsMock.map(i => i.id)) + 1,
      dateCreated: new Date().toISOString().split('T')[0],
      deadline: currentIntervention.deadline || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    interventionsMock.push(newIntervention);
    setFilteredInterventions(showArchived ? [...interventionsMock] : interventionsMock.filter(i => i.status !== "Archivée"));
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

    const index = interventionsMock.findIndex(i => i.id === currentIntervention.id);
    if (index === -1) {
      toast({
        title: "Erreur",
        description: "Intervention non trouvée",
        variant: "destructive",
      });
      return;
    }

    interventionsMock[index] = { ...interventionsMock[index], ...currentIntervention as Intervention };
    
    setFilteredInterventions(showArchived ? [...interventionsMock] : interventionsMock.filter(i => i.status !== "Archivée"));
    setIsEditInterventionDialogOpen(false);

    toast({
      title: "Intervention mise à jour",
      description: `L'intervention #${currentIntervention.id} a été mise à jour`,
    });
  };

  const handleArchiveIntervention = (intervention: Intervention) => {
    if (window.confirm(`Êtes-vous sûr de vouloir archiver l'intervention "${intervention.title}" ?`)) {
      const index = interventionsMock.findIndex(i => i.id === intervention.id);
      if (index !== -1) {
        interventionsMock[index].status = "Archivée";
        interventionsMock[index].archived = true;
        setFilteredInterventions(showArchived ? [...interventionsMock] : interventionsMock.filter(i => i.status !== "Archivée"));
        
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

  const renderInterventionForm = () => (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Titre de l'intervention *</Label>
          <Input
            id="title"
            name="title"
            placeholder="Ex: Remplacement disque SSD"
            value={currentIntervention.title || ''}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="client">Client *</Label>
          <Select
            onValueChange={(value) => handleSelectChange("client", value)}
            value={currentIntervention.client}
          >
            <SelectTrigger id="client">
              <SelectValue placeholder="Sélectionner un client" />
            </SelectTrigger>
            <SelectContent>
              {clientsList.map((client) => (
                <SelectItem key={client} value={client}>
                  {client}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="technician">Technicien *</Label>
          <Select
            onValueChange={(value) => handleSelectChange("technician", value)}
            value={currentIntervention.technician}
          >
            <SelectTrigger id="technician">
              <SelectValue placeholder="Sélectionner un technicien" />
            </SelectTrigger>
            <SelectContent>
              {techniciansList.map((tech) => (
                <SelectItem key={tech} value={tech}>
                  {tech}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="material">Matériel concerné</Label>
          <Input
            id="material"
            name="material"
            placeholder="Ex: PC Portable Dell XPS"
            value={currentIntervention.material || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select
            onValueChange={(value) => handleSelectChange("type", value)}
            value={currentIntervention.type}
          >
            <SelectTrigger id="type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Panne">Panne</SelectItem>
              <SelectItem value="Installation">Installation</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
              <SelectItem value="Mise à jour">Mise à jour</SelectItem>
              <SelectItem value="Autre">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="priority">Priorité</Label>
          <Select
            onValueChange={(value) => handleSelectChange("priority", value)}
            value={currentIntervention.priority}
          >
            <SelectTrigger id="priority">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Basse">Basse</SelectItem>
              <SelectItem value="Moyenne">Moyenne</SelectItem>
              <SelectItem value="Haute">Haute</SelectItem>
              <SelectItem value="Critique">Critique</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status">Statut</Label>
          <Select
            onValueChange={(value) => handleSelectChange("status", value)}
            value={currentIntervention.status}
          >
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="scheduledDate">Date planifiée</Label>
          <Input
            id="scheduledDate"
            name="scheduledDate"
            type="date"
            value={currentIntervention.scheduledDate || ''}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="deadline">Date limite *</Label>
          <Input
            id="deadline"
            name="deadline"
            type="date"
            required
            value={currentIntervention.deadline || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Décrivez le problème ou l'intervention à réaliser..."
          rows={3}
          value={currentIntervention.description || ''}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectId">Projet associé (optionnel)</Label>
        <Input
          id="projectId"
          name="projectId"
          type="number"
          placeholder="ID du projet associé"
          value={currentIntervention.projectId || ''}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="p-4 md:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Interventions</h1>
              <p className="text-muted-foreground mt-1">Gestion des interventions techniques</p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex space-x-2">
              <CustomButton 
                variant="outline" 
                icon={<Archive size={16} />}
                onClick={toggleArchivedView}
              >
                {showArchived ? "Masquer les archives" : "Afficher les archives"}
              </CustomButton>
              
              <Dialog open={isNewInterventionDialogOpen} onOpenChange={setIsNewInterventionDialogOpen}>
                <DialogTrigger asChild>
                  <CustomButton 
                    variant="primary" 
                    icon={<Plus size={16} />}
                  >
                    Nouvelle intervention
                  </CustomButton>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Créer une nouvelle intervention</DialogTitle>
                    <DialogDescription>
                      Complétez les informations nécessaires pour créer une intervention.
                    </DialogDescription>
                  </DialogHeader>
                  {renderInterventionForm()}
                  <DialogFooter>
                    <CustomButton variant="outline" onClick={() => setIsNewInterventionDialogOpen(false)}>
                      Annuler
                    </CustomButton>
                    <CustomButton variant="primary" onClick={handleCreateIntervention}>
                      Créer l'intervention
                    </CustomButton>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="card-glass rounded-xl p-4 flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <AlertTriangle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">En cours</p>
                <h3 className="text-2xl font-bold">
                  {interventionsMock.filter(i => i.status === "En cours").length}
                </h3>
              </div>
            </div>
            
            <div className="card-glass rounded-xl p-4 flex items-center">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">À planifier/En attente</p>
                <h3 className="text-2xl font-bold">
                  {interventionsMock.filter(i => ["À planifier", "En attente"].includes(i.status)).length}
                </h3>
              </div>
            </div>
            
            <div className="card-glass rounded-xl p-4 flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Terminées</p>
                <h3 className="text-2xl font-bold">
                  {interventionsMock.filter(i => i.status === "Terminée").length}
                </h3>
              </div>
            </div>
            
            <div className="card-glass rounded-xl p-4 flex items-center">
              <div className="bg-gray-100 p-3 rounded-full mr-4">
                <Archive className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Archivées</p>
                <h3 className="text-2xl font-bold">
                  {interventionsMock.filter(i => i.status === "Archivée").length}
                </h3>
              </div>
            </div>
          </div>
          
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
                  <CustomButton variant="outline" icon={<Filter size={16} />}>
                    Filtrer
                  </CustomButton>
                  <CustomButton variant="outline" icon={<SortAsc size={16} />}>
                    Trier
                  </CustomButton>
                  <CustomButton variant="outline" icon={<Calendar size={16} />}>
                    Date
                  </CustomButton>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Titre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Technicien</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Priorité</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date limite</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Projet</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredInterventions.map((intervention) => (
                    <tr key={intervention.id} className={`hover:bg-muted/20 transition-colors ${intervention.status === "Archivée" ? "bg-gray-50" : ""}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        #{intervention.id.toString().padStart(4, '0')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium">{intervention.title}</div>
                        {intervention.material && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {intervention.material}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{intervention.client}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{intervention.technician}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClass(intervention.status)}`}>
                          {getStatusIcon(intervention.status)}
                          <span className="ml-1">{intervention.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityClass(intervention.priority)}`}>
                          {intervention.priority}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {new Date(intervention.deadline).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          <Wrench className="h-4 w-4 text-muted-foreground mr-1" />
                          {intervention.type}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {intervention.projectId ? (
                          <CustomButton 
                            variant="ghost" 
                            className="h-8 px-2 text-blue-600 flex items-center"
                            onClick={() => linkToProject(intervention.projectId!)}
                          >
                            <Link size={14} className="mr-1" />
                            #{intervention.projectId}
                          </CustomButton>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <CustomButton 
                          variant="ghost" 
                          className="h-8 px-2 text-primary"
                          onClick={() => handleEditIntervention(intervention)}
                          disabled={intervention.status === "Archivée"}
                        >
                          <Edit size={14} className="mr-1" /> Modifier
                        </CustomButton>
                        
                        {intervention.status !== "Archivée" && (
                          <CustomButton 
                            variant="ghost" 
                            className="h-8 px-2 text-gray-600"
                            onClick={() => handleArchiveIntervention(intervention)}
                          >
                            <Archive size={14} className="mr-1" /> Archiver
                          </CustomButton>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredInterventions.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">Aucune intervention trouvée</p>
              </div>
            )}
            
            <div className="p-4 border-t border-gray-100 flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Affichage de <span className="font-medium">{filteredInterventions.length}</span> interventions
              </p>
              
              <div className="flex gap-2">
                <CustomButton variant="outline" size="sm" disabled>Précédent</CustomButton>
                <CustomButton variant="outline" size="sm" className="bg-primary/5">1</CustomButton>
                <CustomButton variant="outline" size="sm">Suivant</CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={isEditInterventionDialogOpen} onOpenChange={setIsEditInterventionDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier l'intervention</DialogTitle>
            <DialogDescription>
              Modifiez les informations de l'intervention #{currentIntervention.id}
            </DialogDescription>
          </DialogHeader>
          {renderInterventionForm()}
          <DialogFooter>
            <CustomButton variant="outline" onClick={() => setIsEditInterventionDialogOpen(false)}>
              Annuler
            </CustomButton>
            <CustomButton variant="primary" onClick={handleUpdateIntervention}>
              Mettre à jour
            </CustomButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Interventions;
