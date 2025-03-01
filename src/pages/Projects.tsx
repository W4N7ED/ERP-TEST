
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { CustomButton } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  Search,
  Filter,
  ChevronRight,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users
} from "lucide-react";

// Mock data for projects
const projectsMock = [
  {
    id: 1,
    name: "Migration serveurs",
    client: "Entreprise ABC",
    status: "En cours",
    progress: 65,
    startDate: "2023-09-01",
    endDate: "2023-10-15",
    manager: "Jean Dupont",
    assignedTeam: ["Jean Dupont", "Marie Lambert", "Alex Thibault"],
    interventions: 8,
    interventionsCompleted: 5
  },
  {
    id: 2,
    name: "Déploiement postes de travail",
    client: "Société XYZ",
    status: "En cours",
    progress: 30,
    startDate: "2023-09-05",
    endDate: "2023-09-30",
    manager: "Marie Lambert",
    assignedTeam: ["Marie Lambert", "Claire Petit"],
    interventions: 15,
    interventionsCompleted: 4
  },
  {
    id: 3,
    name: "Installation réseau",
    client: "Boutique DEF",
    status: "Terminé",
    progress: 100,
    startDate: "2023-08-15",
    endDate: "2023-09-10",
    manager: "Alex Thibault",
    assignedTeam: ["Alex Thibault", "Jean Dupont"],
    interventions: 6,
    interventionsCompleted: 6
  },
  {
    id: 4,
    name: "Mise à niveau infrastructure",
    client: "Cabinet GHI",
    status: "En attente",
    progress: 0,
    startDate: "2023-09-20",
    endDate: "2023-11-15",
    manager: "Claire Petit",
    assignedTeam: ["Claire Petit", "Alex Thibault", "Jean Dupont", "Marie Lambert"],
    interventions: 12,
    interventionsCompleted: 0
  }
];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projectsMock);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setFilteredProjects(projectsMock);
    } else {
      const filtered = projectsMock.filter(
        project => 
          project.name.toLowerCase().includes(term.toLowerCase()) ||
          project.client.toLowerCase().includes(term.toLowerCase()) ||
          project.manager.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case "En attente": 
        return <Clock size={16} className="text-amber-500" />;
      case "En cours":
        return <AlertCircle size={16} className="text-blue-500" />;
      case "Terminé":
        return <CheckCircle2 size={16} className="text-green-500" />;
      default:
        return null;
    }
  };
  
  const getStatusClass = (status: string) => {
    switch(status) {
      case "En attente": return "status-pending";
      case "En cours": return "status-in-progress";
      case "Terminé": return "status-completed";
      default: return "";
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Projets</h1>
            <p className="text-muted-foreground mt-1">Suivi des projets techniques</p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <CustomButton 
              variant="primary" 
              icon={<Plus size={16} />}
            >
              Nouveau projet
            </CustomButton>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card-glass rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-2">Projets en cours</h3>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">{filteredProjects.filter(p => p.status === "En cours").length}</div>
              <div className="text-primary bg-primary/10 p-2 rounded-full">
                <AlertCircle size={20} />
              </div>
            </div>
          </div>
          
          <div className="card-glass rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-2">Projets terminés</h3>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">{filteredProjects.filter(p => p.status === "Terminé").length}</div>
              <div className="text-green-500 bg-green-50 p-2 rounded-full">
                <CheckCircle2 size={20} />
              </div>
            </div>
          </div>
          
          <div className="card-glass rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-2">Interventions liées</h3>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">
                {filteredProjects.reduce((sum, p) => sum + p.interventions, 0)}
              </div>
              <div className="text-amber-500 bg-amber-50 p-2 rounded-full">
                <Clock size={20} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="card-glass rounded-xl mb-8">
          <div className="p-5 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Rechercher un projet..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <CustomButton variant="outline" icon={<Filter size={16} />}>
                  Filtrer
                </CustomButton>
                <CustomButton variant="outline" icon={<Calendar size={16} />}>
                  Date
                </CustomButton>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {filteredProjects.map(project => (
              <div key={project.id} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-card transition-all duration-300">
                <div className="flex justify-between mb-4">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClass(project.status)}`}>
                    {getStatusIcon(project.status)}
                    <span className="ml-1">{project.status}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4">Client: {project.client}</p>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progression</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-muted-foreground">Date de début</p>
                    <p className="text-sm font-medium">{formatDate(project.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Date de fin prévue</p>
                    <p className="text-sm font-medium">{formatDate(project.endDate)}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Chef de projet</p>
                    <p className="text-sm font-medium">{project.manager}</p>
                  </div>
                  
                  <div className="flex -space-x-2">
                    {project.assignedTeam.slice(0, 3).map((member, idx) => (
                      <div 
                        key={idx}
                        className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border-2 border-white text-primary text-xs font-medium"
                      >
                        {member.split(' ').map(n => n[0]).join('')}
                      </div>
                    ))}
                    {project.assignedTeam.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border-2 border-white text-xs font-medium">
                        +{project.assignedTeam.length - 3}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Users size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {project.interventionsCompleted}/{project.interventions} interventions
                    </span>
                  </div>
                  
                  <CustomButton variant="ghost" size="sm" className="h-8 px-3 text-primary">
                    Détails <ChevronRight size={16} className="ml-1" />
                  </CustomButton>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">Aucun projet trouvé</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Projects;
