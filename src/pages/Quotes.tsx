
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { CustomButton } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Filter,
  ChevronRight,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  FileText,
  DollarSign,
  BarChart3,
  Trash2,
  Edit,
  FileSignature,
  Send
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuotesState } from "@/hooks/useQuotesState";
import { QuoteStatus } from "@/types/quote";
import { QuoteDetail } from "@/components/quotes/QuoteDetail";
import { AddQuoteDialog } from "@/components/quotes/AddQuoteDialog";
import { usePermissions } from "@/hooks/usePermissions";

const Quotes = () => {
  const {
    searchTerm,
    filteredQuotes,
    currentQuote,
    isAddQuoteDialogOpen,
    stats,
    handleSearch,
    handleViewQuote,
    handleAddQuote,
    handleDeleteQuote,
    createNewQuote,
    setIsAddQuoteDialogOpen,
    setCurrentQuote
  } = useQuotesState();
  
  const { hasPermission } = usePermissions();

  const getStatusBadgeClass = (status: QuoteStatus) => {
    switch(status) {
      case "Brouillon": return "bg-gray-50 text-gray-700";
      case "En attente": return "bg-amber-50 text-amber-700";
      case "Envoyé": return "bg-blue-50 text-blue-700";
      case "Validé": return "bg-green-50 text-green-700";
      case "Refusé": return "bg-red-50 text-red-700";
      case "Expiré": return "bg-purple-50 text-purple-700";
      default: return "";
    }
  };
  
  const getStatusIcon = (status: QuoteStatus) => {
    switch(status) {
      case "Brouillon": 
        return <FileText size={16} className="text-gray-500" />;
      case "En attente": 
        return <Clock size={16} className="text-amber-500" />;
      case "Envoyé":
        return <Send size={16} className="text-blue-500" />;
      case "Validé":
        return <CheckCircle2 size={16} className="text-green-500" />;
      case "Refusé":
        return <AlertCircle size={16} className="text-red-500" />;
      case "Expiré":
        return <AlertCircle size={16} className="text-purple-500" />;
      default:
        return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };
  
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
  };

  if (currentQuote) {
    return <QuoteDetail quote={currentQuote} onBack={() => setCurrentQuote(null)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Devis</h1>
            <p className="text-muted-foreground mt-1">Gestion des devis clients</p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <CustomButton 
              variant="primary" 
              icon={<Plus size={16} />}
              onClick={handleAddQuote}
            >
              Nouveau devis
            </CustomButton>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card-glass rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-2">Devis en attente</h3>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">{stats.pending}</div>
              <div className="text-amber-500 bg-amber-50 p-2 rounded-full">
                <Clock size={20} />
              </div>
            </div>
          </div>
          
          <div className="card-glass rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-2">Devis validés</h3>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">{stats.approved}</div>
              <div className="text-green-500 bg-green-50 p-2 rounded-full">
                <CheckCircle2 size={20} />
              </div>
            </div>
          </div>
          
          <div className="card-glass rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-2">Taux de conversion</h3>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">{stats.conversionRate}%</div>
              <div className="text-blue-500 bg-blue-50 p-2 rounded-full">
                <BarChart3 size={20} />
              </div>
            </div>
          </div>

          <div className="card-glass rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-2">Montant validé</h3>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">{formatCurrency(stats.approvedAmount)}</div>
              <div className="text-primary bg-primary/10 p-2 rounded-full">
                <DollarSign size={20} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="card-glass rounded-xl mb-8">
          <div className="p-5 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Rechercher un devis..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <CustomButton variant="outline" icon={<Filter size={16} />}>
                  Filtrer
                </CustomButton>
                <CustomButton variant="outline" icon={<BarChart3 size={16} />}>
                  Rapports
                </CustomButton>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {filteredQuotes.map(quote => (
              <div key={quote.id} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-card transition-all duration-300">
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{quote.reference}</h3>
                    <span className="text-sm text-muted-foreground">
                      {quote.client.company || quote.client.name}
                    </span>
                  </div>
                  <Badge className={`${getStatusBadgeClass(quote.status)} flex items-center gap-1`}>
                    {getStatusIcon(quote.status)}
                    <span>{quote.status}</span>
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <User size={16} className="text-muted-foreground" />
                    <span className="text-sm">{quote.client.name}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-muted-foreground" />
                    <span className="text-sm">Exp: {formatDate(quote.expirationDate)}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="text-sm text-muted-foreground mb-1">Articles</div>
                  <div className="space-y-2">
                    {quote.items.slice(0, 2).map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} (x{item.quantity})</span>
                        <span className="font-medium">{formatCurrency(item.total)}</span>
                      </div>
                    ))}
                    
                    {quote.items.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        + {quote.items.length - 2} autres articles
                      </div>
                    )}
                    
                    {quote.items.length === 0 && (
                      <div className="text-sm italic text-muted-foreground">
                        Aucun article
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="border-t pt-4 flex justify-between items-center">
                  <div className="font-bold text-lg">{formatCurrency(quote.total)}</div>
                  
                  <div className="flex space-x-2">
                    {hasPermission("inventory.delete") && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteQuote(quote)}
                        title="Supprimer le devis"
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                    
                    {quote.status === "Brouillon" && hasPermission("inventory.edit") && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                        title="Modifier le devis"
                      >
                        <Edit size={16} />
                      </Button>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-3 text-primary"
                      onClick={() => handleViewQuote(quote)}
                    >
                      Détails <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredQuotes.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">Aucun devis trouvé</p>
            </div>
          )}
        </div>
      </main>

      <AddQuoteDialog 
        open={isAddQuoteDialogOpen} 
        onOpenChange={setIsAddQuoteDialogOpen}
        onAddQuote={createNewQuote}
      />
    </div>
  );
};

export default Quotes;
