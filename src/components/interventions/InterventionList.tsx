
import React from 'react';
import { CustomButton } from "@/components/ui/custom-button";
import { Edit, Archive, Link } from 'lucide-react';
import { Intervention } from '@/types/intervention';
import { getStatusIcon, getStatusClass, getPriorityClass } from '@/utils/interventionUtils';

interface InterventionListProps {
  filteredInterventions: Intervention[];
  handleEditIntervention: (intervention: Intervention) => void;
  handleArchiveIntervention: (intervention: Intervention) => void;
  linkToProject: (projectId: number) => void;
}

const InterventionList: React.FC<InterventionListProps> = ({
  filteredInterventions,
  handleEditIntervention,
  handleArchiveIntervention,
  linkToProject
}) => {
  return (
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
          {filteredInterventions.length > 0 ? (
            filteredInterventions.map((intervention) => (
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
                    <span>{intervention.type}</span>
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
            ))
          ) : (
            <tr>
              <td colSpan={10} className="px-6 py-10 text-center text-muted-foreground">
                Aucune intervention ne correspond à vos critères de recherche
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
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
  );
};

export default InterventionList;
