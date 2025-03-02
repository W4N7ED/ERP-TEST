
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
  Users,
  FileText,
  DollarSign,
  BarChart3
} from "lucide-react";
import { useProjectsState } from "@/hooks/useProjectsState";
import { ProjectStatus } from "@/types/project";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { AddProjectDialog } from "@/components/projects/AddProjectDialog";

const Projects = () => {
  const {
    searchTerm,
    filteredProjects,
    currentProject,
    isAddProjectDialogOpen,
    stats,
    handleSearch,
    handleViewProject,
    handleAddProject,
    handleEditProject,
    handleDeleteProject,
    setIsAddProjectDialogOpen,
    setCurrentProject
  } = useProjectsState();

  const getStatusIcon = (status: ProjectStatus) => {
    switch(status) {
      case "En attente": 
        return <Clock size={16} className="text-amber-500" />;
      case "En cours":
        return <AlertCircle size={16} className="text-blue-500" />;
      case "Terminé":
        return <CheckCircle2 size={16} className="text-green-500" />;
      case "Annulé":
        return <AlertCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };
  
  const getStatusClass = (status: ProjectStatus) => {
    switch(status) {
      case "En attente": return "bg-amber-50 text-amber-700";
      case "En cours": return "bg-blue-50 text-blue-700";
      case "Terminé": return "bg-green-50 text-green-700";
      case "Annulé": return "bg-red-50 text-red-700";
      default: return "";
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  if (currentProject) {
    return <ProjectDetail project={currentProject} onBack={() => setCurrentProject(null)} />;
  }

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
              onClick={handleAddProject}
            >
              Nouveau projet
            </CustomButton>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card-glass rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-2">Projets en cours</h3>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">{stats.inProgress}</div>
              <div className="text-primary bg-primary/10 p-2 rounded-full">
                <AlertCircle size={20} />
              </div>
            </div>
          </div>
          
          <div className="card-glass rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-2">Projets terminés</h3>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">{stats.completed}</div>
              <div className="text-green-500 bg-green-50 p-2 rounded-full">
                <CheckCircle2 size={20} />
              </div>
            </div>
          </div>
          
          <div className="card-glass rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-2">Tâches totales</h3>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">{stats.totalTasks}</div>
              <div className="text-amber-500 bg-amber-50 p-2 rounded-full">
                <FileText size={20} />
              </div>
            </div>
          </div>

          <div className="card-glass rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-2">Budget total</h3>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">{stats.totalBudget.toLocaleString('fr-FR')} €</div>
              <div className="text-blue-500 bg-blue-50 p-2 rounded-full">
                <DollarSign size={20} />
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
                <CustomButton variant="outline" icon={<BarChart3 size={16} />}>
                  Rapports
                </CustomButton>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {filteredProjects.map(project => (
              <div key={project.id} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-card transition-all duration-300">
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <span className="text-sm text-muted-foreground">{project.reference}</span>
                  </div>
                  <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClass(project.status)}`}>
                    {getStatusIcon(project.status)}
                    <span className="ml-1">{project.status}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4">
                  Client: {project.client || "N/A"} | Location: {project.location}
                </p>
                
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
                    <p className="text-sm font-medium">
                      {project.team.find(member => member.role.includes("Chef"))?.name || project.team[0]?.name || "Non assigné"}
                    </p>
                  </div>
                  
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member, idx) => (
                      <div 
                        key={idx}
                        className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border-2 border-white text-primary text-xs font-medium"
                        title={`${member.name} (${member.role})`}
                      >
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    ))}
                    {project.team.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border-2 border-white text-xs font-medium">
                        +{project.team.length - 3}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <FileText size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {project.phases.reduce((total, phase) => total + phase.tasks.filter(task => task.status === "Terminée").length, 0)}/
                      {project.phases.reduce((total, phase) => total + phase.tasks.length, 0)} tâches
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <CustomButton 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-3 text-primary"
                      onClick={() => handleViewProject(project)}
                    >
                      Détails <ChevronRight size={16} className="ml-1" />
                    </CustomButton>
                  </div>
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

      <AddProjectDialog 
        open={isAddProjectDialogOpen} 
        onOpenChange={setIsAddProjectDialogOpen} 
      />
    </div>
  );
};

export default Projects;
