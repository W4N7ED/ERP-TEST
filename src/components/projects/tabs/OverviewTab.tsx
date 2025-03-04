
import React from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MapPin, Users, Calendar, DollarSign } from "lucide-react";
import { formatDate, getStatusClass, getStatusIcon } from "../utils/statusUtils";

interface OverviewTabProps {
  project: Project;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ project }) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};
