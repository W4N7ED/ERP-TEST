
import React from "react";
import { Project } from "@/types/project";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { CustomButton } from "@/components/ui/custom-button";
import { Edit, UserPlus } from "lucide-react";

interface TeamTabProps {
  project: Project;
  onAddMember: () => void;
}

export const TeamTab: React.FC<TeamTabProps> = ({ project, onAddMember }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Équipe du projet</CardTitle>
          <CustomButton variant="outline" size="sm" icon={<UserPlus size={16} />} onClick={onAddMember}>
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
            <CustomButton variant="outline" icon={<UserPlus size={16} />} onClick={onAddMember}>
              Ajouter un membre
            </CustomButton>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
