
import { useState } from "react";
import { Quote, QuoteStatus, QuoteItem } from "@/types/quote";
import { 
  ArrowLeft, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  Download, 
  Trash2, 
  Edit, 
  DollarSign,
  Printer,
  History,
  UserPlus,
  FileSignature
} from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddQuoteItemDialog } from "./AddQuoteItemDialog";
import { useQuotesState } from "@/hooks/useQuotesState";
import { toast } from "sonner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePermissions } from "@/hooks/usePermissions";

interface QuoteDetailProps {
  quote: Quote;
  onBack: () => void;
}

export const QuoteDetail: React.FC<QuoteDetailProps> = ({ quote, onBack }) => {
  const { addQuoteItem, removeQuoteItem, updateQuoteStatus } = useQuotesState();
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const { hasPermission, hasAnyPermission } = usePermissions();
  
  const getStatusBadgeClass = (status: QuoteStatus) => {
    switch(status) {
      case "Brouillon": return "bg-gray-100 text-gray-800";
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
      case "Brouillon": return <FileText size={16} />;
      case "En attente": return <Clock size={16} className="text-amber-500" />;
      case "Envoyé": return <Send size={16} className="text-blue-500" />;
      case "Validé": return <CheckCircle2 size={16} className="text-green-500" />;
      case "Refusé": return <AlertCircle size={16} className="text-red-500" />;
      case "Expiré": return <AlertCircle size={16} className="text-purple-500" />;
      default: return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };
  
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
  };
  
  const handleStatusChange = (status: string) => {
    if (hasPermission("inventory.edit")) {
      updateQuoteStatus(quote.id, status as QuoteStatus);
    } else {
      toast.error("Vous n'avez pas les permissions pour modifier le statut du devis");
    }
  };
  
  const handleAddItem = (itemData: any) => {
    if (hasPermission("inventory.edit")) {
      addQuoteItem(quote.id, itemData);
    } else {
      toast.error("Vous n'avez pas les permissions pour ajouter un article au devis");
    }
  };
  
  const handleDeleteItem = (itemId: number) => {
    if (hasPermission("inventory.delete")) {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
        removeQuoteItem(quote.id, itemId);
      }
    } else {
      toast.error("Vous n'avez pas les permissions pour supprimer un article du devis");
    }
  };
  
  const handleSendQuote = () => {
    if (quote.status === "Brouillon" || quote.status === "En attente") {
      updateQuoteStatus(quote.id, "Envoyé");
      toast.success("Devis envoyé avec succès");
    } else {
      toast.error("Le devis ne peut pas être envoyé avec son statut actuel");
    }
  };
  
  const handleGeneratePDF = () => {
    toast.info("Génération du PDF...");
    // Logique de génération de PDF à implémenter
  };
  
  const canEdit = hasPermission("inventory.edit") && 
                 (quote.status === "Brouillon" || quote.status === "En attente");
  
  const canDelete = hasPermission("inventory.delete") && 
                   (quote.status === "Brouillon" || quote.status === "En attente");
  
  const renderItemDetails = (item: QuoteItem) => {
    if (item.type === "Produit" && (item.brand || item.model || item.application || item.license)) {
      return (
        <div className="mt-2 text-xs text-gray-500 space-y-1">
          {item.brand && (
            <div><span className="font-medium">Marque:</span> {item.brand}</div>
          )}
          {item.model && (
            <div><span className="font-medium">Modèle:</span> {item.model}</div>
          )}
          {item.application && (
            <div><span className="font-medium">Application:</span> {item.application}</div>
          )}
          {item.license && (
            <div><span className="font-medium">Licence:</span> {item.license}</div>
          )}
          {item.priceHT !== undefined && (
            <div><span className="font-medium">Prix HT:</span> {formatCurrency(item.priceHT)}</div>
          )}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-2xl font-bold">Devis {quote.reference}</h1>
          <Badge variant="outline" className={`ml-2 ${getStatusBadgeClass(quote.status)}`}>
            {getStatusIcon(quote.status)} <span className="ml-1">{quote.status}</span>
          </Badge>
        </div>
        
        <div className="flex space-x-2">
          {quote.status !== "Validé" && quote.status !== "Refusé" && quote.status !== "Expiré" && (
            <Select defaultValue={quote.status} onValueChange={handleStatusChange} disabled={!hasPermission("inventory.edit")}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Changer le statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Brouillon">Brouillon</SelectItem>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="Envoyé">Envoyé</SelectItem>
                <SelectItem value="Validé">Validé</SelectItem>
                <SelectItem value="Refusé">Refusé</SelectItem>
                <SelectItem value="Expiré">Expiré</SelectItem>
              </SelectContent>
            </Select>
          )}
          
          <Button variant="outline" size="icon" onClick={handleGeneratePDF} title="Télécharger en PDF">
            <Download size={16} />
          </Button>
          
          <Button variant="outline" size="icon" title="Imprimer">
            <Printer size={16} />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card-glass rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold mb-2">Informations du devis</h3>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-start space-x-2">
                    <Calendar size={16} className="mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date de création</p>
                      <p className="font-medium">{formatDate(quote.createdAt)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Clock size={16} className="mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date d'expiration</p>
                      <p className="font-medium">{formatDate(quote.expirationDate)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <User size={16} className="mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Responsable</p>
                      <p className="font-medium">{quote.responsibleName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <FileText size={16} className="mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Référence</p>
                      <p className="font-medium">{quote.reference}</p>
                    </div>
                  </div>
                </div>
                
                {quote.projectId && (
                  <div className="mt-4 flex items-center space-x-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      Lié au projet #{quote.projectId}
                    </Badge>
                  </div>
                )}
                
                {quote.interventionId && (
                  <div className="mt-2 flex items-center space-x-2">
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                      Lié à l'intervention #{quote.interventionId}
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col space-y-2">
                {quote.status === "Brouillon" && hasPermission("inventory.edit") && (
                  <Button onClick={() => handleStatusChange("En attente")}>
                    Finaliser
                  </Button>
                )}
                
                {(quote.status === "Brouillon" || quote.status === "En attente") && hasPermission("inventory.edit") && (
                  <Button variant="outline" onClick={handleSendQuote}>
                    <Send size={16} className="mr-2" /> Envoyer
                  </Button>
                )}
                
                {quote.status === "Envoyé" && hasAnyPermission(["inventory.edit", "inventory.add"]) && (
                  <Button variant="outline" onClick={() => toast.info("Fonctionnalité de signature en développement")}>
                    <FileSignature size={16} className="mr-2" /> Signature
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="card-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Articles</h3>
              
              {canEdit && (
                <Button onClick={() => setIsAddItemDialogOpen(true)}>
                  <Plus size={16} className="mr-2" /> Ajouter un article
                </Button>
              )}
            </div>
            
            {quote.items.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText size={24} className="mx-auto mb-2" />
                <p>Aucun article dans ce devis</p>
                {canEdit && (
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setIsAddItemDialogOpen(true)}
                  >
                    <Plus size={16} className="mr-2" /> Ajouter un article
                  </Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-sm">
                      <th className="py-2 text-left font-medium">Description</th>
                      <th className="py-2 text-right font-medium">Prix unitaire</th>
                      <th className="py-2 text-right font-medium">Qté</th>
                      <th className="py-2 text-right font-medium">Remise</th>
                      <th className="py-2 text-right font-medium">TVA</th>
                      <th className="py-2 text-right font-medium">Total</th>
                      {canDelete && <th className="py-2 w-10"></th>}
                    </tr>
                  </thead>
                  <tbody>
                    {quote.items.map((item) => (
                      <tr key={item.id} className="border-b last:border-0">
                        <td className="py-3">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            <Badge variant="outline" className="rounded-sm font-normal">
                              {item.type}
                            </Badge>
                          </div>
                          {renderItemDetails(item)}
                        </td>
                        <td className="py-3 text-right">{formatCurrency(item.unitPrice)}</td>
                        <td className="py-3 text-right">{item.quantity}</td>
                        <td className="py-3 text-right">{item.discount ? `${item.discount}%` : '-'}</td>
                        <td className="py-3 text-right">{item.taxRate}%</td>
                        <td className="py-3 text-right font-medium">{formatCurrency(item.total)}</td>
                        {canDelete && (
                          <td className="py-3 text-right">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sous-total</span>
                    <span>{formatCurrency(quote.subtotal)}</span>
                  </div>
                  
                  {quote.discount && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Remise ({quote.discount.type === 'Percentage' ? `${quote.discount.value}%` : 'Fixe'})</span>
                      <span>-{formatCurrency(quote.discount.amount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span>TVA</span>
                    <span>{formatCurrency(quote.taxTotal)}</span>
                  </div>
                  
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total</span>
                    <span>{formatCurrency(quote.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {quote.notes && (
            <div className="card-glass rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Notes</h3>
              <p className="text-muted-foreground">{quote.notes}</p>
            </div>
          )}
          
          {quote.terms && (
            <div className="card-glass rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Conditions générales</h3>
              <p className="text-muted-foreground">{quote.terms}</p>
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <div className="card-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Client</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <User size={18} className="mt-0.5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{quote.client.name}</p>
                  {quote.client.company && (
                    <p className="text-sm text-muted-foreground">{quote.client.company}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="mt-0.5 text-muted-foreground" />
                <p className="text-sm">{quote.client.address}</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail size={18} className="mt-0.5 text-muted-foreground" />
                <p className="text-sm">{quote.client.email}</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone size={18} className="mt-0.5 text-muted-foreground" />
                <p className="text-sm">{quote.client.phone}</p>
              </div>
            </div>
          </div>
          
          <div className="card-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Émetteur</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <User size={18} className="mt-0.5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{quote.issuer.name}</p>
                  <p className="text-sm text-muted-foreground">{quote.issuer.role}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Building size={18} className="mt-0.5 text-muted-foreground" />
                <p className="text-sm">{quote.issuer.department}</p>
              </div>
            </div>
          </div>
          
          <div className="card-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Historique</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
              >
                {isHistoryExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </div>
            
            <div className="space-y-3 mt-4">
              {(isHistoryExpanded ? quote.history : quote.history.slice(0, 3)).map((entry, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <History size={16} className="mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm">{entry.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(entry.date)} • {entry.user}
                    </p>
                  </div>
                </div>
              ))}
              
              {!isHistoryExpanded && quote.history.length > 3 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full text-xs"
                  onClick={() => setIsHistoryExpanded(true)}
                >
                  Voir tout l'historique <ChevronDown size={14} className="ml-1" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <AddQuoteItemDialog 
        open={isAddItemDialogOpen} 
        onOpenChange={setIsAddItemDialogOpen}
        onAddItem={handleAddItem}
      />
    </div>
  );
};
