
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { CustomButton } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Filter,
  User,
  Mail,
  Phone,
  Shield,
  Settings,
  Tool,
  BarChart,
  FileText
} from "lucide-react";

// Mock data for users
const usersMock = [
  {
    id: 1,
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "+33 6 12 34 56 78",
    role: "Technicien",
    status: "Actif",
    lastActive: "2023-09-14T15:30:00",
    avatarInitials: "JD"
  },
  {
    id: 2,
    name: "Marie Lambert",
    email: "marie.lambert@example.com",
    phone: "+33 6 23 45 67 89",
    role: "Technicien",
    status: "Actif",
    lastActive: "2023-09-14T14:15:00",
    avatarInitials: "ML"
  },
  {
    id: 3,
    name: "Alex Thibault",
    email: "alex.thibault@example.com",
    phone: "+33 6 34 56 78 90",
    role: "Administrateur",
    status: "Actif",
    lastActive: "2023-09-14T16:45:00",
    avatarInitials: "AT"
  },
  {
    id: 4,
    name: "Claire Petit",
    email: "claire.petit@example.com",
    phone: "+33 6 45 67 89 01",
    role: "Gestionnaire de projet",
    status: "Actif",
    lastActive: "2023-09-14T11:20:00",
    avatarInitials: "CP"
  },
  {
    id: 5,
    name: "Thomas Martin",
    email: "thomas.martin@example.com",
    phone: "+33 6 56 78 90 12",
    role: "Opérateur",
    status: "Inactif",
    lastActive: "2023-09-10T09:10:00",
    avatarInitials: "TM"
  },
  {
    id: 6,
    name: "Sophie Leroy",
    email: "sophie.leroy@example.com",
    phone: "+33 6 67 89 01 23",
    role: "Commercial",
    status: "Actif",
    lastActive: "2023-09-14T13:05:00",
    avatarInitials: "SL"
  }
];

// Role icons mapping
const roleIcons: Record<string, React.ReactNode> = {
  "Administrateur": <Shield size={16} />,
  "Technicien": <Tool size={16} />,
  "Opérateur": <Settings size={16} />,
  "Gestionnaire de projet": <BarChart size={16} />,
  "Commercial": <FileText size={16} />
};

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(usersMock);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setFilteredUsers(usersMock);
    } else {
      const filtered = usersMock.filter(
        user => 
          user.name.toLowerCase().includes(term.toLowerCase()) ||
          user.email.toLowerCase().includes(term.toLowerCase()) ||
          user.role.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };
  
  const getStatusClass = (status: string) => {
    return status === "Actif" 
      ? "bg-green-100 text-green-700" 
      : "bg-gray-100 text-gray-700";
  };
  
  const formatLastActive = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return `${date.toLocaleDateString('fr-FR')} à ${date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
  };
  
  const getRoleBadgeClass = (role: string) => {
    switch(role) {
      case "Administrateur": 
        return "bg-purple-100 text-purple-700";
      case "Technicien":
        return "bg-blue-100 text-blue-700";
      case "Opérateur":
        return "bg-amber-100 text-amber-700";
      case "Gestionnaire de projet":
        return "bg-green-100 text-green-700";
      case "Commercial":
        return "bg-indigo-100 text-indigo-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Utilisateurs</h1>
            <p className="text-muted-foreground mt-1">Gestion des utilisateurs et leurs permissions</p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <CustomButton 
              variant="primary" 
              icon={<Plus size={16} />}
            >
              Nouvel utilisateur
            </CustomButton>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {["Administrateur", "Technicien", "Opérateur", "Commercial"].map((role) => (
            <div 
              key={role}
              className="card-glass rounded-xl p-5 flex items-center justify-between"
            >
              <div>
                <h3 className="font-medium">{role}s</h3>
                <p className="text-2xl font-bold mt-1">
                  {usersMock.filter(user => user.role === role).length}
                </p>
              </div>
              <div className={`${getRoleBadgeClass(role).replace('text-', 'bg-').replace('bg-', 'text-')} p-3 rounded-full`}>
                {roleIcons[role]}
              </div>
            </div>
          ))}
        </div>
        
        <div className="card-glass rounded-xl mb-8">
          <div className="p-5 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Rechercher un utilisateur..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <CustomButton variant="outline" icon={<Filter size={16} />}>
                  Filtrer
                </CustomButton>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Utilisateur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Coordonnées</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Rôle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Dernière activité</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mr-3">
                          {user.avatarInitials}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{user.name}</div>
                          <div className="text-xs text-muted-foreground">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm flex items-center mb-1">
                        <Mail size={14} className="mr-2 text-muted-foreground" />
                        {user.email}
                      </div>
                      <div className="text-sm flex items-center">
                        <Phone size={14} className="mr-2 text-muted-foreground" />
                        {user.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getRoleBadgeClass(user.role)}`}>
                        {roleIcons[user.role]}
                        <span className="ml-1">{user.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClass(user.status)}`}>
                        {user.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {formatLastActive(user.lastActive)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <CustomButton variant="ghost" className="h-8 px-2 text-primary">Modifier</CustomButton>
                      <CustomButton variant="ghost" className="h-8 px-2 text-muted-foreground">Détails</CustomButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">Aucun utilisateur trouvé</p>
            </div>
          )}
          
          <div className="p-4 border-t border-gray-100 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Affichage de <span className="font-medium">{filteredUsers.length}</span> utilisateurs
            </p>
            
            <div className="flex gap-2">
              <CustomButton variant="outline" size="sm" disabled>Précédent</CustomButton>
              <CustomButton variant="outline" size="sm" className="bg-primary/5">1</CustomButton>
              <CustomButton variant="outline" size="sm">Suivant</CustomButton>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Users;
