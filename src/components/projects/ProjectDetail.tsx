
import React, { useState } from "react";
import { Project } from "@/types/project";
import Navbar from "@/components/layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddPhaseDialog } from "./AddPhaseDialog";
import { AddTaskDialog } from "./AddTaskDialog";
import { AddMemberDialog } from "./AddMemberDialog";
import { useProjectsState } from "@/hooks/useProjectsState";
import { ProjectHeader } from "./ProjectHeader";
import { OverviewTab } from "./tabs/OverviewTab";
import { PhasesTab } from "./tabs/PhasesTab";
import { TeamTab } from "./tabs/TeamTab";
import { BudgetTab } from "./tabs/BudgetTab";

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 animate-fade-in">
        <ProjectHeader project={project} onBack={onBack} />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="phases">Phases et tâches</TabsTrigger>
            <TabsTrigger value="team">Équipe</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <OverviewTab project={project} />
          </TabsContent>
          
          <TabsContent value="phases">
            <PhasesTab 
              project={project} 
              onAddPhase={() => setIsAddPhaseDialogOpen(true)}
              onAddTask={handleAddTaskClick}
              onDeleteTask={handleDeleteTask}
            />
          </TabsContent>
          
          <TabsContent value="team">
            <TeamTab 
              project={project} 
              onAddMember={() => setIsAddMemberDialogOpen(true)} 
            />
          </TabsContent>
          
          <TabsContent value="budget">
            <BudgetTab project={project} />
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
