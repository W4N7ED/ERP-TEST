
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Project, ProjectPhase, ProjectMember, TaskPriority } from "@/types/project";

interface AddTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: number;
  phaseId: number;
  phaseName: string;
  teamMembers: ProjectMember[];
  onAddTask: (projectId: number, phaseId: number, taskData: {
    name: string;
    priority: TaskPriority;
    deadline: string;
    description?: string;
    assignedToId?: number;
  }) => void;
}

export const AddTaskDialog: React.FC<AddTaskDialogProps> = ({
  open,
  onOpenChange,
  projectId,
  phaseId,
  phaseName,
  teamMembers,
  onAddTask
}) => {
  const [formData, setFormData] = useState({
    name: "",
    priority: "Moyenne" as TaskPriority,
    deadline: "",
    description: "",
    assignedToId: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      priority: "Moyenne",
      deadline: "",
      description: "",
      assignedToId: ""
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.deadline) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    // Add task
    onAddTask(projectId, phaseId, {
      name: formData.name,
      priority: formData.priority,
      deadline: formData.deadline,
      description: formData.description || undefined,
      assignedToId: formData.assignedToId ? parseInt(formData.assignedToId) : undefined
    });
    
    // Reset and close
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle tâche</DialogTitle>
          <DialogDescription>
            Ajoutez une nouvelle tâche à la phase "{phaseName}".
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nom de la tâche *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Configuration serveur, Test unitaires..."
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="priority">Priorité</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleSelectChange("priority", value)}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Sélectionner une priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Basse">Basse</SelectItem>
                  <SelectItem value="Moyenne">Moyenne</SelectItem>
                  <SelectItem value="Élevée">Élevée</SelectItem>
                  <SelectItem value="Haute">Haute</SelectItem>
                  <SelectItem value="Urgente">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="deadline">Date limite *</Label>
              <Input
                id="deadline"
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="assignedToId">Assigner à</Label>
            <Select
              value={formData.assignedToId}
              onValueChange={(value) => handleSelectChange("assignedToId", value)}
            >
              <SelectTrigger id="assignedToId">
                <SelectValue placeholder="Sélectionner un membre de l'équipe" />
              </SelectTrigger>
              <SelectContent>
                {teamMembers.length > 0 ? (
                  teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id.toString()}>
                      {member.name} ({member.role})
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="" disabled>
                    Aucun membre disponible
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description détaillée de la tâche..."
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => {
              resetForm();
              onOpenChange(false);
            }}>
              Annuler
            </Button>
            <Button type="submit">Ajouter la tâche</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
