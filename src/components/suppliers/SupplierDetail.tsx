
import React from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { Supplier, inventoryMock } from "@/types/inventory";
import { Mail, Phone, Truck, Package, Clock, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SupplierDetailProps {
  supplier: Supplier;
  onBack: () => void;
}

const SupplierDetail: React.FC<SupplierDetailProps> = ({ supplier, onBack }) => {
  // Get all products from this supplier
  const supplierProducts = inventoryMock.filter(item => item.supplier === supplier.id);

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold">{supplier.name}</h2>
          <p className="text-muted-foreground flex items-center gap-1 mt-1">
            <Truck size={16} className="text-primary" />
            Fournisseur #{supplier.id}
          </p>
        </div>
        <CustomButton 
          variant="outline" 
          onClick={onBack}
        >
          Retour à la liste
        </CustomButton>
      </div>
      
      <Tabs defaultValue="info" className="mb-8">
        <TabsList>
          <TabsTrigger value="info">Informations</TabsTrigger>
          <TabsTrigger value="products">Produits ({supplierProducts.length})</TabsTrigger>
          <TabsTrigger value="history">Historique des commandes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Contact card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
                <CardDescription>Informations de contact</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full text-primary">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href={`mailto:${supplier.email}`} className="text-primary hover:underline">
                      {supplier.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full text-primary">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Téléphone</p>
                    <a href={`tel:${supplier.phone}`} className="hover:underline">
                      {supplier.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full text-primary">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Délai de livraison moyen</p>
                    <p className="font-medium">{supplier.deliveryTime} jours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Stats card */}
            <Card>
              <CardHeader>
                <CardTitle>Statistiques</CardTitle>
                <CardDescription>Aperçu de l'activité</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-700">
                    <Package size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Produits fournis</p>
                    <p className="font-medium">{supplierProducts.length} articles</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-700">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Dernière commande</p>
                    <p className="font-medium">15/03/2023</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 p-2 rounded-full text-amber-700">
                    <Truck size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total commandes</p>
                    <p className="font-medium">5 commandes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Additional info card */}
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
                <CardDescription>Informations supplémentaires</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Aucune note disponible pour ce fournisseur. Cliquez sur Modifier pour ajouter des notes.
                </p>
                <div className="mt-4">
                  <CustomButton variant="outline" size="sm">
                    Modifier les notes
                  </CustomButton>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="products" className="mt-6">
          <div className="bg-muted/20 rounded-lg p-5">
            <h3 className="text-lg font-medium mb-4">Produits de ce fournisseur</h3>
            
            {supplierProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/30">
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Référence</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Nom</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Catégorie</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Stock</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Prix d'achat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {supplierProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-muted/10">
                        <td className="px-4 py-3 text-sm">{product.reference}</td>
                        <td className="px-4 py-3 text-sm font-medium">{product.name}</td>
                        <td className="px-4 py-3 text-sm">{product.category} / {product.subcategory || "-"}</td>
                        <td className="px-4 py-3 text-sm">{product.quantity}</td>
                        <td className="px-4 py-3 text-sm">{product.unitCost ? `${product.unitCost.toFixed(2)} €` : "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center p-8 text-muted-foreground">
                Aucun produit enregistré pour ce fournisseur.
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <div className="bg-muted/20 rounded-lg p-5 text-center">
            <h3 className="text-lg font-medium mb-2">Historique des commandes</h3>
            <p className="text-muted-foreground mb-4">
              L'historique des commandes n'est pas encore disponible.
            </p>
            <CustomButton variant="outline">
              Configurer le suivi des commandes
            </CustomButton>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierDetail;
