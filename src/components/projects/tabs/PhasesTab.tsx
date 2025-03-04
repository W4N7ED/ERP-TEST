
import React from "react";
import { Project } from "@/types/project";
import { CustomButton } from "@/components/ui/custom-button";
import { Plus } from "lucide-react";
import { PhaseCard } from "./phase/PhaseCard";

interface PhasesTabProps {
  project: Project;
  onAddPhase: () => void;
  onAddTask: (phaseId: number, phaseName: string) => void;
  onDeleteTask: (phaseId: number, taskId: number) => void;
}

export const PhasesTab: React.FC<PhasesTabProps> = ({ 
  project, 
  onAddPhase, 
  onAddTask, 
  onDeleteTask 
}) => {
  return (
    <div>
      <div className="space-y-4">
        {project.phases.map(phase => (
          <PhaseCard 
            key={phase.id}
            phase={phase} 
            projectId={project.id} 
            onAddTask={onAddTask} 
            onDeleteTask={onDeleteTask} 
          />
        ))}
        
        {project.phases.length === 0 && (
          <div className="text-center p-8">
            <p className="text-muted-foreground mb-4">Aucune phase n'a encore été créée pour ce projet</p>
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <CustomButton variant="outline" icon={<Plus size={16} />} onClick={onAddPhase}>
          Ajouter une phase
        </CustomButton>
      </div>
    </div>
  );
};
