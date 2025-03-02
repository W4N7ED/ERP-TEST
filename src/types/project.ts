
export type ProjectStatus = 'En attente' | 'En cours' | 'Terminé' | 'Annulé';
export type TaskStatus = 'À faire' | 'En cours' | 'En attente' | 'Terminée';
export type TaskPriority = 'Basse' | 'Moyenne' | 'Élevée' | 'Haute' | 'Urgente';

export interface ProjectMember {
  id: number;
  name: string;
  role: string;
}

export interface ProjectPhase {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  progress: number;
  description?: string;
  milestones: ProjectMilestone[];
  tasks: ProjectTask[];
}

export interface ProjectMilestone {
  id: number;
  name: string;
  date: string;
  completed: boolean;
  description?: string;
}

export interface ProjectTask {
  id: number;
  name: string;
  status: TaskStatus;
  priority: TaskPriority;
  deadline: string;
  assignedTo?: ProjectMember;
  description?: string;
  interventions: number[]; // IDs of linked interventions
}

export interface Project {
  id: number;
  name: string;
  reference: string;
  client?: string;
  location: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  progress: number;
  description?: string;
  budget: {
    estimated: number;
    actual: number;
  };
  team: ProjectMember[];
  phases: ProjectPhase[];
  createdAt: string;
  updatedAt: string;
  archived?: boolean; // Nouveau champ pour marquer un projet comme archivé
}

// Mock data for projects
export const projectsMock: Project[] = [
  {
    id: 1,
    name: "Migration serveurs",
    reference: "PRJ-2023-001",
    client: "Entreprise ABC",
    location: "Site principal",
    status: "En cours",
    progress: 65,
    startDate: "2023-09-01",
    endDate: "2023-10-15",
    description: "Migration des serveurs de production vers une nouvelle infrastructure",
    budget: {
      estimated: 24000,
      actual: 22500
    },
    team: [
      { id: 1, name: "Jean Dupont", role: "Chef de projet" },
      { id: 2, name: "Marie Lambert", role: "Technicien senior" },
      { id: 3, name: "Alex Thibault", role: "Technicien réseau" }
    ],
    phases: [
      {
        id: 1,
        name: "Préparation",
        startDate: "2023-09-01",
        endDate: "2023-09-10",
        status: "Terminé",
        progress: 100,
        milestones: [
          { id: 1, name: "Validation du plan", date: "2023-09-05", completed: true }
        ],
        tasks: [
          {
            id: 1,
            name: "Inventaire des serveurs",
            status: "Terminée",
            priority: "Haute",
            deadline: "2023-09-03",
            interventions: [1]
          },
          {
            id: 2,
            name: "Planification des sauvegardes",
            status: "Terminée",
            priority: "Moyenne",
            deadline: "2023-09-07",
            interventions: [2]
          }
        ]
      },
      {
        id: 2,
        name: "Migration",
        startDate: "2023-09-11",
        endDate: "2023-10-05",
        status: "En cours",
        progress: 70,
        milestones: [
          { id: 2, name: "Mise en service des nouveaux serveurs", date: "2023-09-20", completed: true },
          { id: 3, name: "Migration des données terminée", date: "2023-10-01", completed: false }
        ],
        tasks: [
          {
            id: 3,
            name: "Installation des nouveaux serveurs",
            status: "Terminée",
            priority: "Élevée",
            deadline: "2023-09-18",
            interventions: [3, 4]
          },
          {
            id: 4,
            name: "Migration des données",
            status: "En cours",
            priority: "Élevée",
            deadline: "2023-10-01",
            interventions: [5]
          }
        ]
      },
      {
        id: 3,
        name: "Tests et finalisation",
        startDate: "2023-10-06",
        endDate: "2023-10-15",
        status: "En attente",
        progress: 0,
        milestones: [
          { id: 4, name: "Validation finale", date: "2023-10-15", completed: false }
        ],
        tasks: [
          {
            id: 5,
            name: "Tests de performance",
            status: "À faire",
            priority: "Élevée",
            deadline: "2023-10-10",
            interventions: []
          },
          {
            id: 6,
            name: "Formation des utilisateurs",
            status: "À faire",
            priority: "Moyenne",
            deadline: "2023-10-12",
            interventions: []
          }
        ]
      }
    ],
    createdAt: "2023-08-15",
    updatedAt: "2023-09-20"
  },
  {
    id: 2,
    name: "Déploiement postes de travail",
    reference: "PRJ-2023-002",
    client: "Société XYZ",
    location: "Siège social",
    status: "En cours",
    progress: 30,
    startDate: "2023-09-05",
    endDate: "2023-09-30",
    description: "Installation et configuration de 50 nouveaux postes de travail",
    budget: {
      estimated: 18000,
      actual: 15000
    },
    team: [
      { id: 2, name: "Marie Lambert", role: "Chef de projet" },
      { id: 4, name: "Claire Petit", role: "Technicien" }
    ],
    phases: [
      {
        id: 4,
        name: "Préparation",
        startDate: "2023-09-05",
        endDate: "2023-09-10",
        status: "Terminé",
        progress: 100,
        milestones: [
          { id: 5, name: "Image système validée", date: "2023-09-08", completed: true }
        ],
        tasks: [
          {
            id: 7,
            name: "Création de l'image système",
            status: "Terminée",
            priority: "Élevée",
            deadline: "2023-09-07",
            interventions: [6]
          }
        ]
      },
      {
        id: 5,
        name: "Déploiement",
        startDate: "2023-09-11",
        endDate: "2023-09-25",
        status: "En cours",
        progress: 40,
        milestones: [
          { id: 6, name: "50% des postes déployés", date: "2023-09-18", completed: false }
        ],
        tasks: [
          {
            id: 8,
            name: "Installation matérielle",
            status: "En cours",
            priority: "Moyenne",
            deadline: "2023-09-20",
            interventions: [7, 8, 9]
          },
          {
            id: 9,
            name: "Configuration logicielle",
            status: "En cours",
            priority: "Moyenne",
            deadline: "2023-09-22",
            interventions: [10]
          }
        ]
      },
      {
        id: 6,
        name: "Formation",
        startDate: "2023-09-26",
        endDate: "2023-09-30",
        status: "En attente",
        progress: 0,
        milestones: [
          { id: 7, name: "Formation complétée", date: "2023-09-30", completed: false }
        ],
        tasks: [
          {
            id: 10,
            name: "Sessions de formation",
            status: "À faire",
            priority: "Basse",
            deadline: "2023-09-29",
            interventions: []
          }
        ]
      }
    ],
    createdAt: "2023-08-25",
    updatedAt: "2023-09-15"
  },
  {
    id: 3,
    name: "Installation réseau",
    reference: "PRJ-2023-003",
    client: "Boutique DEF",
    location: "Nouveau local commercial",
    status: "Terminé",
    progress: 100,
    startDate: "2023-08-15",
    endDate: "2023-09-10",
    description: "Installation complète du réseau informatique pour le nouveau local",
    budget: {
      estimated: 12000,
      actual: 11800
    },
    team: [
      { id: 3, name: "Alex Thibault", role: "Chef de projet" },
      { id: 1, name: "Jean Dupont", role: "Technicien" }
    ],
    phases: [
      {
        id: 7,
        name: "Installation",
        startDate: "2023-08-15",
        endDate: "2023-09-01",
        status: "Terminé",
        progress: 100,
        milestones: [
          { id: 8, name: "Câblage terminé", date: "2023-08-25", completed: true }
        ],
        tasks: [
          {
            id: 11,
            name: "Câblage structuré",
            status: "Terminée",
            priority: "Élevée",
            deadline: "2023-08-25",
            interventions: [11, 12]
          },
          {
            id: 12,
            name: "Installation équipements actifs",
            status: "Terminée",
            priority: "Élevée",
            deadline: "2023-09-01",
            interventions: [13]
          }
        ]
      },
      {
        id: 8,
        name: "Configuration et tests",
        startDate: "2023-09-02",
        endDate: "2023-09-10",
        status: "Terminé",
        progress: 100,
        milestones: [
          { id: 9, name: "Tests validés", date: "2023-09-08", completed: true }
        ],
        tasks: [
          {
            id: 13,
            name: "Configuration des équipements",
            status: "Terminée",
            priority: "Moyenne",
            deadline: "2023-09-05",
            interventions: [14]
          },
          {
            id: 14,
            name: "Tests de connectivité",
            status: "Terminée",
            priority: "Moyenne",
            deadline: "2023-09-08",
            interventions: [15]
          }
        ]
      }
    ],
    createdAt: "2023-08-10",
    updatedAt: "2023-09-10"
  },
  {
    id: 4,
    name: "Mise à niveau infrastructure",
    reference: "PRJ-2023-004",
    client: "Cabinet GHI",
    location: "Tous sites",
    status: "En attente",
    progress: 0,
    startDate: "2023-09-20",
    endDate: "2023-11-15",
    description: "Mise à niveau complète de l'infrastructure informatique",
    budget: {
      estimated: 45000,
      actual: 0
    },
    team: [
      { id: 4, name: "Claire Petit", role: "Chef de projet" },
      { id: 3, name: "Alex Thibault", role: "Expert technique" },
      { id: 1, name: "Jean Dupont", role: "Technicien senior" },
      { id: 2, name: "Marie Lambert", role: "Technicien" }
    ],
    phases: [
      {
        id: 9,
        name: "Audit et analyse",
        startDate: "2023-09-20",
        endDate: "2023-10-05",
        status: "En attente",
        progress: 0,
        milestones: [
          { id: 10, name: "Rapport d'audit validé", date: "2023-10-05", completed: false }
        ],
        tasks: [
          {
            id: 15,
            name: "Audit de l'existant",
            status: "À faire",
            priority: "Élevée",
            deadline: "2023-09-30",
            interventions: []
          },
          {
            id: 16,
            name: "Analyse des besoins",
            status: "À faire",
            priority: "Élevée",
            deadline: "2023-10-03",
            interventions: []
          }
        ]
      },
      {
        id: 10,
        name: "Mise en œuvre",
        startDate: "2023-10-06",
        endDate: "2023-11-10",
        status: "En attente",
        progress: 0,
        milestones: [
          { id: 11, name: "Mise à niveau réseau", date: "2023-10-20", completed: false },
          { id: 12, name: "Mise à niveau serveurs", date: "2023-11-05", completed: false }
        ],
        tasks: [
          {
            id: 17,
            name: "Mise à niveau équipements réseau",
            status: "À faire",
            priority: "Moyenne",
            deadline: "2023-10-20",
            interventions: []
          },
          {
            id: 18,
            name: "Mise à niveau serveurs",
            status: "À faire",
            priority: "Moyenne",
            deadline: "2023-11-05",
            interventions: []
          },
          {
            id: 19,
            name: "Mise à niveau postes de travail",
            status: "À faire",
            priority: "Basse",
            deadline: "2023-11-10",
            interventions: []
          }
        ]
      },
      {
        id: 11,
        name: "Finalisation",
        startDate: "2023-11-11",
        endDate: "2023-11-15",
        status: "En attente",
        progress: 0,
        milestones: [
          { id: 13, name: "Projet terminé", date: "2023-11-15", completed: false }
        ],
        tasks: [
          {
            id: 20,
            name: "Tests finaux",
            status: "À faire",
            priority: "Élevée",
            deadline: "2023-11-13",
            interventions: []
          },
          {
            id: 21,
            name: "Documentation",
            status: "À faire",
            priority: "Moyenne",
            deadline: "2023-11-15",
            interventions: []
          }
        ]
      }
    ],
    createdAt: "2023-09-01",
    updatedAt: "2023-09-01"
  }
];
