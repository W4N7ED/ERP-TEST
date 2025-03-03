
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { inventoryMock } from "@/types/inventory";
import { productDetailSchema } from "./schema/quoteFormSchema";

// Définition du schéma de validation étendu avec les détails du produit
const quoteItemFormSchema = z.object({
  type: z.enum(["Produit", "Service", "Forfait"]),
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  description: z.string().min(5, "La description doit contenir au moins 5 caractères"),
  unitPrice: z.number().min(0, "Le prix unitaire doit être positif"),
  quantity: z.number().min(1, "La quantité doit être au moins 1"),
  discount: z.number().min(0).max(100).optional(),
  taxRate: z.number().min(0).max(100),
  inventoryItemId: z.number().optional(),
  // Nouveaux champs pour les détails du produit
  brand: z.string().optional(),
  model: z.string().optional(),
  application: z.string().optional(),
  license: z.string().optional(),
  priceHT: z.number().min(0).optional(),
});

type QuoteItemFormData = z.infer<typeof quoteItemFormSchema>;

interface AddQuoteItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddItem: (itemData: {
    type: "Produit" | "Service" | "Forfait";
    name: string;
    description: string;
    unitPrice: number;
    quantity: number;
    discount?: number;
    taxRate: number;
    inventoryItemId?: number;
    brand?: string;
    model?: string;
    application?: string;
    license?: string;
    priceHT?: number;
  }) => void;
}

export const AddQuoteItemDialog: React.FC<AddQuoteItemDialogProps> = ({
  open,
  onOpenChange,
  onAddItem,
}) => {
  const [selectedType, setSelectedType] = useState<string>("Produit");
  const [selectedInventoryItem, setSelectedInventoryItem] = useState<string>("");
  
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<QuoteItemFormData>({
    resolver: zodResolver(quoteItemFormSchema),
    defaultValues: {
      type: "Produit",
      quantity: 1,
      taxRate: 20, // Taux de TVA par défaut
    },
  });
  
  const watchType = watch("type");
  
  // Filtrer les articles d'inventaire pour les produits
  const inventoryItems = inventoryMock.filter(item => item.quantity > 0);
  
  const handleInventoryItemChange = (id: string) => {
    setSelectedInventoryItem(id);
    const itemId = parseInt(id);
    const item = inventoryMock.find(i => i.id === itemId);
    
    if (item) {
      setValue("name", item.name);
      setValue("description", item.description || `${item.brand} ${item.model}`);
      setValue("unitPrice", item.sellingPrice || 0);
      setValue("inventoryItemId", item.id);
      setValue("brand", item.brand);
      setValue("model", item.model);
      // Définir le prix HT comme le prix de vente par défaut
      setValue("priceHT", item.sellingPrice || 0);
    }
  };
  
  const handleTypeChange = (value: string) => {
    setSelectedType(value as "Produit" | "Service" | "Forfait");
    setValue("type", value as "Produit" | "Service" | "Forfait");
    
    // Réinitialiser certains champs si on change de type
    if (value !== "Produit") {
      setValue("inventoryItemId", undefined);
      setValue("brand", undefined);
      setValue("model", undefined);
      setValue("application", undefined);
      setValue("license", undefined);
      setValue("priceHT", undefined);
      setSelectedInventoryItem("");
    }
  };

  const onSubmit = async (data: QuoteItemFormData) => {
    onAddItem({
      type: data.type,
      name: data.name,
      description: data.description,
      unitPrice: data.unitPrice,
      quantity: data.quantity,
      discount: data.discount,
      taxRate: data.taxRate,
      inventoryItemId: data.inventoryItemId,
      brand: data.brand,
      model: data.model,
      application: data.application,
      license: data.license,
      priceHT: data.priceHT,
    });
    
    reset();
    setSelectedInventoryItem("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Ajouter un article au devis</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type d'article*</Label>
            <Select 
              value={watchType} 
              onValueChange={handleTypeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Produit">Produit</SelectItem>
                <SelectItem value="Service">Service</SelectItem>
                <SelectItem value="Forfait">Forfait</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {watchType === "Produit" && (
            <div className="space-y-2">
              <Label htmlFor="inventoryItem">Produit de l'inventaire</Label>
              <Select 
                value={selectedInventoryItem} 
                onValueChange={handleInventoryItemChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un produit" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {inventoryItems.map(item => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name} - {item.sellingPrice?.toFixed(2) || "N/A"} € ({item.quantity} en stock)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="name">Nom*</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description*</Label>
            <Textarea
              id="description"
              {...register("description")}
              className="h-20"
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>
          
          {watchType === "Produit" && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Détails du produit</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">Marque</Label>
                  <Input id="brand" {...register("brand")} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="model">Modèle</Label>
                  <Input id="model" {...register("model")} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="application">Application</Label>
                  <Input id="application" {...register("application")} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="license">Licence</Label>
                  <Input id="license" {...register("license")} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priceHT">Prix HT (€)</Label>
                <Input 
                  id="priceHT" 
                  type="number" 
                  step="0.01"
                  {...register("priceHT", {
                    valueAsNumber: true,
                  })} 
                />
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="unitPrice">Prix unitaire (€)*</Label>
              <Input 
                id="unitPrice" 
                type="number" 
                step="0.01"
                {...register("unitPrice", {
                  valueAsNumber: true,
                })} 
              />
              {errors.unitPrice && (
                <p className="text-sm text-red-500">{errors.unitPrice.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantité*</Label>
              <Input 
                id="quantity" 
                type="number" 
                min="1"
                {...register("quantity", {
                  valueAsNumber: true,
                })} 
              />
              {errors.quantity && (
                <p className="text-sm text-red-500">{errors.quantity.message}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discount">Remise (%)</Label>
              <Input 
                id="discount" 
                type="number" 
                min="0" 
                max="100"
                {...register("discount", {
                  valueAsNumber: true,
                })} 
              />
              {errors.discount && (
                <p className="text-sm text-red-500">{errors.discount.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="taxRate">Taux de TVA (%)*</Label>
              <Input 
                id="taxRate" 
                type="number" 
                min="0" 
                max="100"
                {...register("taxRate", {
                  valueAsNumber: true,
                })} 
              />
              {errors.taxRate && (
                <p className="text-sm text-red-500">{errors.taxRate.message}</p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Ajouter l'article
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
