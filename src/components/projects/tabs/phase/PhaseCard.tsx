
import React from "react";
import { ProjectPhase, ProjectTask } from "@/types/project";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, FileText, Milestone, PencilRuler, ListPlus, Trash2, Users } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { formatDate, getStatusClass, getStatusIcon, getTaskPriorityClass } from "../../utils/statusUtils";

interface PhaseCardProps {
  phase: ProjectPhase;
  projectId: number;
  onAddTask: (phaseId: number, phaseName: string) => void;
  onDeleteTask: (phaseId: number, taskId: number) => void;
}

export const PhaseCard: React.FC<PhaseCardProps> = ({ 
  phase, 
  projectId, 
  onAddTask, 
  onDeleteTask 
}) => {
  return (
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
              onClick={() => onAddTask(phase.id, phase.name)}
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
                      onClick={() => onDeleteTask(phase.id, task.id)} 
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
};

import { CheckCircle2, Clock } from "lucide-react";
