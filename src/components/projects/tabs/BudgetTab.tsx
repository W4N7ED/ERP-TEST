
import React from "react";
import { Project } from "@/types/project";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign } from "lucide-react";

interface BudgetTabProps {
  project: Project;
}

export const BudgetTab: React.FC<BudgetTabProps> = ({ project }) => {
  return (
    <>
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
    </>
  );
};
