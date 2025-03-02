
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { StatusChart } from "@/components/dashboard/StatusChart";
import { CustomButton } from "@/components/ui/custom-button";
import {
  Wrench,
  Package,
  FolderKanban,
  FileText,
  ChevronRight,
  Plus,
  Users
} from "lucide-react";

const statusChartData = [
  { name: "En attente", value: 12, color: "#FBBF24" },  // amber-400
  { name: "En cours", value: 18, color: "#3B82F6" },    // blue-500
  { name: "Terminé", value: 25, color: "#10B981" },     // green-500
  { name: "Annulé", value: 5, color: "#EF4444" }        // red-500
];

const recentInterventions = [
  { id: 1, title: "Remplacement disque SSD", client: "Entreprise ABC", status: "En cours", date: "2023-09-15" },
  { id: 2, title: "Installation imprimante réseau", client: "Société XYZ", status: "En attente", date: "2023-09-16" },
  { id: 3, title: "Maintenance serveur", client: "Agence 123", status: "Terminé", date: "2023-09-14" },
  { id: 4, title: "Dépannage réseau", client: "Boutique DEF", status: "Terminé", date: "2023-09-13" }
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getStatusClass = (status: string) => {
    switch(status) {
      case "En attente": return "status-pending";
      case "En cours": return "status-in-progress";
      case "Terminé": return "status-completed";
      case "Annulé": return "status-cancelled";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16 md:pl-64">
        <div className="p-4 md:p-6 lg:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Tableau de bord</h1>
              <p className="text-muted-foreground mt-1">Bienvenue sur votre EDR TechManager</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-3">
              <CustomButton 
                variant="primary" 
                icon={<Plus size={16} />}
              >
                Nouvelle intervention
              </CustomButton>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 rounded-xl bg-gray-100 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <DashboardCard
                title="Interventions en cours"
                value="18"
                icon={<Wrench size={20} />}
                description="3 en attente aujourd'hui"
                trend={{ value: 12, isPositive: true }}
              />
              
              <DashboardCard
                title="Stock total"
                value="342 articles"
                icon={<Package size={20} />}
                description="8 alertes stock bas"
                trend={{ value: 5, isPositive: false }}
              />
              
              <DashboardCard
                title="Projets actifs"
                value="7"
                icon={<FolderKanban size={20} />}
                description="2 en retard"
                trend={{ value: 20, isPositive: true }}
              />
              
              <DashboardCard
                title="Devis en attente"
                value="12"
                icon={<FileText size={20} />}
                description="Montant: 24,850 €"
                trend={{ value: 8, isPositive: true }}
              />
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="card-glass rounded-xl p-5 h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Interventions récentes</h2>
                  <CustomButton variant="ghost" className="text-sm">
                    Voir tout <ChevronRight size={16} className="ml-1" />
                  </CustomButton>
                </div>
                
                <div className="space-y-4">
                  {recentInterventions.map(intervention => (
                    <div 
                      key={intervention.id}
                      className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-all bg-white"
                    >
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">{intervention.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(intervention.status)}`}>
                          {intervention.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{intervention.client}</span>
                        <span>{new Date(intervention.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="card-glass rounded-xl p-5">
              <h2 className="text-xl font-semibold mb-6">Statuts des interventions</h2>
              <StatusChart data={statusChartData} />
              <div className="grid grid-cols-2 gap-2 mt-4">
                {statusChartData.map((status, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                    <span className="text-sm">{status.name}: {status.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="card-glass rounded-xl p-5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Équipe technique</h2>
              <CustomButton variant="ghost" icon={<Users size={16} />} className="text-sm">
                Gestion de l'équipe
              </CustomButton>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 bg-white">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {["JD", "ML", "AT", "CP"][i]}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">
                      {["Jean Dupont", "Marie Lambert", "Alex Thibault", "Claire Petit"][i]}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {["Technicien senior", "Technicienne réseau", "Admin système", "Support niveau 2"][i]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
