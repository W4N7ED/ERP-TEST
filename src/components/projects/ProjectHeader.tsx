
import React from "react";
import { Project } from "@/types/project";
import { CustomButton } from "@/components/ui/custom-button";
import { ArrowLeft, Edit, Printer } from "lucide-react";
import { getStatusClass, getStatusIcon } from "./utils/statusUtils";

interface ProjectHeaderProps {
  project: Project;
  onBack: () => void;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project, onBack }) => {
  return (
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
  );
};
