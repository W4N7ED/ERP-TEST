import React, { useState } from "react";
import { Project, ProjectPhase, ProjectTask } from "@/types/project";
import Navbar from "@/components/layout/Navbar";
import { CustomButton } from "@/components/ui/custom-button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Edit,
  FileText,
  MapPin,
  Milestone,
  PencilRuler,
  Plus,
  Printer,
  Users,
  DollarSign,
  UserPlus,
  ListPlus,
  Trash2
} from "lucide-react";
import { AddPhaseDialog } from "./AddPhaseDialog";
import { AddTaskDialog } from "./AddTaskDialog";
import { AddMemberDialog } from "./AddMemberDialog";
import { useProjectsState } from "@/hooks/useProjectsState";

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddPhaseDialogOpen, setIsAddPhaseDialogOpen] = useState(false);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [selectedPhaseId, setSelectedPhaseId] = useState<number | null>(null);
  const [selectedPhaseName, setSelectedPhaseName] = useState<string>("");

  const { addPhaseToProject, addTaskToPhase, addMemberToProject, deleteTask } = useProjectsState();

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "En attente": 
        return <Clock size={16} className="text-amber-500" />;
      case "En cours":
        return <AlertCircle size={16} className="text-blue-500" />;
      case "Terminé":
      case "Terminée":
        return <CheckCircle2 size={16} className="text-green-500" />;
      default:
        return null;
    }
  };
  
  const getStatusClass = (status: string) => {
    switch(status) {
      case "En attente": 
      case "À faire":
        return "bg-amber-50 text-amber-700";
      case "En cours":
        return "bg-blue-50 text-blue-700";
      case "Terminé":
      case "Terminée":
        return "bg-green-50 text-green-700";
      default:
        return "";
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getTaskPriorityClass = (priority: string) => {
    switch(priority) {
      case "Basse": return "bg-gray-50 text-gray-700";
      case "Moyenne": return "bg-blue-50 text-blue-700";
      case "Élevée": 
      case "Haute":
        return "bg-orange-50 text-orange-700";
      case "Urgente": return "bg-red-50 text-red-700";
      default: return "";
    }
  };

  const handleAddTaskClick = (phaseId: number, phaseName: string) => {
    setSelectedPhaseId(phaseId);
    setSelectedPhaseName(phaseName);
    setIsAddTaskDialogOpen(true);
  };

  const handleDeleteTask = (phaseId: number, taskId: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      deleteTask(project.id, phaseId, taskId);
    }
  };

  const renderPhaseCard = (phase: ProjectPhase) => (
    <Card key={phase.id} className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{phase.name}</CardTitle>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <Calendar size={14} className="mr-1" />
              <span>{formatDate(phase.startDate)} - {formatDate(phase.endDate)}</span>
            </div>
          </div>
          <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClass(phase.status)}`}>
            {getStatusIcon(phase.status)}
            <span className="ml-1">{phase.status}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progression</span>
            <span className="font-medium">{phase.progress}%</span>
          </div>
          <Progress value={phase.progress} className="h-2" />
        </div>

        {phase.milestones.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-sm mb-2 flex items-center">
              <Milestone size={16} className="mr-2" /> Jalons
            </h4>
            <div className="space-y-2">
              {phase.milestones.map(milestone => (
                <div key={milestone.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    {milestone.completed ? (
                      <CheckCircle2 size={16} className="text-green-500 mr-2" />
                    ) : (
                      <Clock size={16} className="text-amber-500 mr-2" />
                    )}
                    <span className="text-sm">{milestone.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{formatDate(milestone.date)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-sm flex items-center">
              <FileText size={16} className="mr-2" /> Tâches ({phase.tasks.filter(t => t.status === "Terminée").length}/{phase.tasks.length})
            </h4>
            <CustomButton 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-primary"
              onClick={() => handleAddTaskClick(phase.id, phase.name)}
              icon={<ListPlus size={14} />}
            >
              Ajouter
            </CustomButton>
          </div>
          
          <div className="space-y-2">
            {phase.tasks.map(task => (
              <div key={task.id} className="p-2 bg-gray-50 rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium text-sm">{task.name}</div>
                  <div className="flex space-x-2 items-start">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTaskPriorityClass(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClass(task.status)}`}>
                      {getStatusIcon(task.status)}
                      <span className="ml-1">{task.status}</span>
                    </span>
                    <button 
                      onClick={() => handleDeleteTask(phase.id, task.id)} 
                      className="text-red-500 hover:text-red-700 p-0.5"
                      title="Supprimer la tâche"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar size={12} className="mr-1" />
                    <span>Deadline: {formatDate(task.deadline)}</span>
                  </div>
                  {task.assignedTo && (
                    <div className="flex items-center">
                      <Users size={12} className="mr-1" />
                      <span>{task.assignedTo.name}</span>
                    </div>
                  )}
                  {task.interventions.length > 0 && (
                    <div className="flex items-center">
                      <PencilRuler size={12} className="mr-1" />
                      <span>{task.interventions.length} intervention{task.interventions.length > 1 ? 's' : ''}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {phase.tasks.length === 0 && (
              <div className="p-2 text-center text-sm text-muted-foreground">
                Aucune tâche dans cette phase
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div className="flex items-center">
            <CustomButton
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="mr-2"
            >
              <ArrowLeft size={20} />
            </CustomButton>
            <div>
              <h1 className="text-3xl font-bold">{project.name}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-muted-foreground">{project.reference}</span>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClass(project.status)}`}>
                  {getStatusIcon(project.status)}
                  <span className="ml-1">{project.status}</span>
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0 flex gap-2">
            <CustomButton variant="outline" icon={<Printer size={16} />}>
              Exporter
            </CustomButton>
            <CustomButton variant="primary" icon={<Edit size={16} />}>
              Modifier
            </CustomButton>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="phases">Phases et tâches</TabsTrigger>
            <TabsTrigger value="team">Équipe</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Progression globale</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Avancement</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2 mb-4" />
                  
                  <div className="text-sm text-muted-foreground">
                    <div className="flex justify-between mb-1">
                      <span>Phases terminées:</span>
                      <span className="font-medium">{project.phases.filter(p => p.status === "Terminé").length}/{project.phases.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tâches terminées:</span>
                      <span className="font-medium">
                        {project.phases.reduce((total, phase) => total + phase.tasks.filter(task => task.status === "Terminée").length, 0)}/
                        {project.phases.reduce((total, phase) => total + phase.tasks.length, 0)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Dates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Date de début:</span>
                      <span className="font-medium">{formatDate(project.startDate)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Date de fin prévue:</span>
                      <span className="font-medium">{formatDate(project.endDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Durée totale:</span>
                      <span className="font-medium">
                        {Math.ceil((new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24))} jours
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Informations client</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <div className="flex items-start mb-2">
                      <Users size={16} className="mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{project.client || "N/A"}</div>
                        <div className="text-muted-foreground">Client</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin size={16} className="mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{project.location}</div>
                        <div className="text-muted-foreground">Localisation</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Description du projet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{project.description || "Aucune description disponible"}</p>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Prochains jalons</h2>
              <div className="space-y-3">
                {project.phases
                  .flatMap(phase => phase.milestones.map(m => ({ ...m, phaseId: phase.id, phaseName: phase.name })))
                  .filter(m => !m.completed)
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 3)
                  .map(milestone => (
                    <div key={milestone.id} className="p-4 bg-white border border-gray-100 rounded-xl">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{milestone.name}</h3>
                          <div className="text-sm text-muted-foreground mt-1">
                            Phase: {milestone.phaseName}
                          </div>
                        </div>
                        <div className="text-sm font-medium">{formatDate(milestone.date)}</div>
                      </div>
                    </div>
                  ))}
                
                {project.phases
                  .flatMap(phase => phase.milestones.map(m => ({ ...m, phaseId: phase.id, phaseName: phase.name })))
                  .filter(m => !m.completed).length === 0 && (
                  <div className="text-center p-4">
                    <p className="text-muted-foreground">Tous les jalons sont complétés</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="phases">
            <div className="space-y-4">
              {project.phases.map(phase => renderPhaseCard(phase))}
              
              {project.phases.length === 0 && (
                <div className="text-center p-8">
                  <p className="text-muted-foreground mb-4">Aucune phase n'a encore été créée pour ce projet</p>
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <CustomButton variant="outline" icon={<Plus size={16} />} onClick={() => setIsAddPhaseDialogOpen(true)}>
                Ajouter une phase
              </CustomButton>
            </div>
          </TabsContent>
          
          <TabsContent value="team">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Équipe du projet</CardTitle>
                  <CustomButton variant="outline" size="sm" icon={<UserPlus size={16} />} onClick={() => setIsAddMemberDialogOpen(true)}>
                    Ajouter un membre
                  </CustomButton>
                </div>
              </CardHeader>
              <CardContent>
                {project.team.length > 0 ? (
                  <div className="space-y-4">
                    {project.team.map((member, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium mr-3">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="font-medium">{member.name}</h3>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <CustomButton variant="ghost" size="sm">
                          <Edit size={16} />
                        </CustomButton>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <p className="text-muted-foreground mb-4">Aucun membre n'a encore été ajouté à ce projet</p>
                    <CustomButton variant="outline" icon={<UserPlus size={16} />} onClick={() => setIsAddMemberDialogOpen(true)}>
                      Ajouter un membre
                    </CustomButton>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="budget">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Budget estimé</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold flex items-center">
                    <DollarSign size={24} className="text-muted-foreground mr-1" />
                    {project.budget.estimated.toLocaleString('fr-FR')} €
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Budget dépensé</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold flex items-center">
                    <DollarSign size={24} className="text-muted-foreground mr-1" />
                    {project.budget.actual.toLocaleString('fr-FR')} €
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Utilisation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Pourcentage utilisé</span>
                      <span className="font-medium">
                        {Math.round((project.budget.actual / project.budget.estimated) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={Math.round((project.budget.actual / project.budget.estimated) * 100)} 
                      className="h-2" 
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Restant:</span>
                      <span className="font-medium">
                        {(project.budget.estimated - project.budget.actual).toLocaleString('fr-FR')} €
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Détails financiers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Cette section permettra de suivre les dépenses détaillées du projet, par catégorie et par phase.
                </p>
                
                <div className="rounded-md border p-4 text-center">
                  <p className="text-muted-foreground">Module en cours de développement</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <AddPhaseDialog 
        open={isAddPhaseDialogOpen}
        onOpenChange={setIsAddPhaseDialogOpen}
        projectId={project.id}
        onAddPhase={addPhaseToProject}
      />
      
      <AddTaskDialog 
        open={isAddTaskDialogOpen}
        onOpenChange={setIsAddTaskDialogOpen}
        projectId={project.id}
        phaseId={selectedPhaseId || 0}
        phaseName={selectedPhaseName}
        teamMembers={project.team}
        onAddTask={addTaskToPhase}
      />
      
      <AddMemberDialog 
        open={isAddMemberDialogOpen}
        onOpenChange={setIsAddMemberDialogOpen}
        projectId={project.id}
        onAddMember={addMemberToProject}
      />
    </div>
  );
};
