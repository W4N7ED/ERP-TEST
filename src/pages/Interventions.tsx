import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { CustomButton } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/input";
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
  Wrench
} from "lucide-react";

// Mock data for interventions
const interventionsMock = [
  { 
    id: 1, 
    title: "Remplacement disque SSD", 
    client: "Entreprise ABC", 
    technician: "Jean Dupont",
    status: "En cours", 
    priority: "Moyenne",
    dateCreated: "2023-09-10", 
    deadline: "2023-09-17" 
  },
  { 
    id: 2, 
    title: "Installation imprimante réseau", 
    client: "Société XYZ", 
    technician: "Marie Lambert",
    status: "En attente", 
    priority: "Basse",
    dateCreated: "2023-09-12", 
    deadline: "2023-09-20" 
  },
  { 
    id: 3, 
    title: "Maintenance serveur", 
    client: "Agence 123", 
    technician: "Alex Thibault",
    status: "Terminé", 
    priority: "Haute",
    dateCreated: "2023-09-05", 
    deadline: "2023-09-14" 
  },
  { 
    id: 4, 
    title: "Dépannage réseau", 
    client: "Boutique DEF", 
    technician: "Claire Petit",
    status: "Terminé", 
    priority: "Haute",
    dateCreated: "2023-09-08", 
    deadline: "2023-09-13" 
  },
  { 
    id: 5, 
    title: "Mise à jour des postes de travail", 
    client: "Cabinet GHI", 
    technician: "Jean Dupont",
    status: "En cours", 
    priority: "Moyenne",
    dateCreated: "2023-09-11", 
    deadline: "2023-09-18" 
  },
  { 
    id: 6, 
    title: "Réparation serveur de données", 
    client: "Restaurant JKL", 
    technician: "Alex Thibault",
    status: "Annulé", 
    priority: "Critique",
    dateCreated: "2023-09-09", 
    deadline: "2023-09-15" 
  },
  { 
    id: 7, 
    title: "Installation de postes de travail", 
    client: "Clinique MNO", 
    technician: "Marie Lambert",
    status: "En attente", 
    priority: "Basse",
    dateCreated: "2023-09-13", 
    deadline: "2023-09-25" 
  }
];

const Interventions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInterventions, setFilteredInterventions] = useState(interventionsMock);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setFilteredInterventions(interventionsMock);
    } else {
      const filtered = interventionsMock.filter(
        intervention => 
          intervention.title.toLowerCase().includes(term.toLowerCase()) ||
          intervention.client.toLowerCase().includes(term.toLowerCase()) ||
          intervention.technician.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredInterventions(filtered);
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case "En attente": 
        return <Clock size={16} className="text-amber-500" />;
      case "En cours":
        return <AlertTriangle size={16} className="text-blue-500" />;
      case "Terminé":
        return <CheckCircle2 size={16} className="text-green-500" />;
      case "Annulé":
        return <XCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };
  
  const getStatusClass = (status: string) => {
    switch(status) {
      case "En attente": return "status-pending";
      case "En cours": return "status-in-progress";
      case "Terminé": return "status-completed";
      case "Annulé": return "status-cancelled";
      default: return "";
    }
  };
  
  const getPriorityClass = (priority: string) => {
    switch(priority) {
      case "Basse": return "bg-gray-100 text-gray-700";
      case "Moyenne": return "bg-blue-100 text-blue-700";
      case "Haute": return "bg-amber-100 text-amber-700";
      case "Critique": return "bg-red-100 text-red-700";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16 md:pl-64">
        <div className="p-4 md:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Interventions</h1>
              <p className="text-muted-foreground mt-1">Gestion des interventions techniques</p>
            </div>
            
            <div className="mt-4 sm:mt-0">
              <CustomButton 
                variant="primary" 
                icon={<Plus size={16} />}
              >
                Nouvelle intervention
              </CustomButton>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredInterventions.map((intervention) => (
                    <tr key={intervention.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        #{intervention.id.toString().padStart(4, '0')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium">{intervention.title}</div>
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
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <CustomButton variant="ghost" className="h-8 px-2 text-primary">Modifier</CustomButton>
                        <CustomButton variant="ghost" className="h-8 px-2 text-muted-foreground">Détails</CustomButton>
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
    </div>
  );
};

export default Interventions;
