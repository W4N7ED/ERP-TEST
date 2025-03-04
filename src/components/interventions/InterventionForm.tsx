
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Intervention } from "@/types/intervention";
import { techniciansList, clientsList } from "@/data/interventionsMock";

interface InterventionFormProps {
  currentIntervention: Partial<Intervention>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const InterventionForm: React.FC<InterventionFormProps> = ({
  currentIntervention,
  onInputChange,
  onSelectChange
}) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Titre de l'intervention *</Label>
          <Input
            id="title"
            name="title"
            placeholder="Ex: Remplacement disque SSD"
            value={currentIntervention.title || ''}
            onChange={onInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="client">Client *</Label>
          <Select
            onValueChange={(value) => onSelectChange("client", value)}
            value={currentIntervention.client}
          >
            <SelectTrigger id="client">
              <SelectValue placeholder="Sélectionner un client" />
            </SelectTrigger>
            <SelectContent>
              {clientsList.map((client) => (
                <SelectItem key={client} value={client}>
                  {client}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="technician">Technicien *</Label>
          <Select
            onValueChange={(value) => onSelectChange("technician", value)}
            value={currentIntervention.technician}
          >
            <SelectTrigger id="technician">
              <SelectValue placeholder="Sélectionner un technicien" />
            </SelectTrigger>
            <SelectContent>
              {techniciansList.map((tech) => (
                <SelectItem key={tech} value={tech}>
                  {tech}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="material">Matériel concerné</Label>
          <Input
            id="material"
            name="material"
            placeholder="Ex: PC Portable Dell XPS"
            value={currentIntervention.material || ''}
            onChange={onInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select
            onValueChange={(value) => onSelectChange("type", value)}
            value={currentIntervention.type}
          >
            <SelectTrigger id="type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Panne">Panne</SelectItem>
              <SelectItem value="Installation">Installation</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
              <SelectItem value="Mise à jour">Mise à jour</SelectItem>
              <SelectItem value="Autre">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="priority">Priorité</Label>
          <Select
            onValueChange={(value) => onSelectChange("priority", value)}
            value={currentIntervention.priority}
          >
            <SelectTrigger id="priority">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Basse">Basse</SelectItem>
              <SelectItem value="Moyenne">Moyenne</SelectItem>
              <SelectItem value="Haute">Haute</SelectItem>
              <SelectItem value="Critique">Critique</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status">Statut</Label>
          <Select
            onValueChange={(value) => onSelectChange("status", value)}
            value={currentIntervention.status}
          >
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="À planifier">À planifier</SelectItem>
              <SelectItem value="Planifiée">Planifiée</SelectItem>
              <SelectItem value="En cours">En cours</SelectItem>
              <SelectItem value="En attente">En attente</SelectItem>
              <SelectItem value="Terminée">Terminée</SelectItem>
              <SelectItem value="Annulée">Annulée</SelectItem>
              <SelectItem value="Archivée">Archivée</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="scheduledDate">Date planifiée</Label>
          <Input
            id="scheduledDate"
            name="scheduledDate"
            type="date"
            value={currentIntervention.scheduledDate || ''}
            onChange={onInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="deadline">Date limite *</Label>
          <Input
            id="deadline"
            name="deadline"
            type="date"
            required
            value={currentIntervention.deadline || ''}
            onChange={onInputChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Décrivez le problème ou l'intervention à réaliser..."
          rows={3}
          value={currentIntervention.description || ''}
          onChange={onInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectId">Projet associé (optionnel)</Label>
        <Input
          id="projectId"
          name="projectId"
          type="number"
          placeholder="ID du projet associé"
          value={currentIntervention.projectId || ''}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
};

export default InterventionForm;
