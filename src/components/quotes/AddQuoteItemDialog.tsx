
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { inventoryMock } from "@/types/inventory";
import QuoteItemTypeSelector from "./form/QuoteItemTypeSelector";
import QuoteItemBaseFields from "./form/QuoteItemBaseFields";
import ProductDetailFields from "./form/ProductDetailFields";
import PricingFields from "./form/PricingFields";

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
    // Make sure we're passing an object with the required properties
    const itemData = {
      type: data.type,
      name: data.name,
      description: data.description,
      unitPrice: data.unitPrice,
      quantity: data.quantity,
      taxRate: data.taxRate,
      // Optional properties
      discount: data.discount,
      inventoryItemId: data.inventoryItemId,
      brand: data.brand,
      model: data.model,
      application: data.application,
      license: data.license,
      priceHT: data.priceHT,
    };
    
    onAddItem(itemData);
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
          <QuoteItemTypeSelector
            type={watchType}
            selectedInventoryItem={selectedInventoryItem}
            onTypeChange={handleTypeChange}
            onInventoryItemChange={handleInventoryItemChange}
          />
          
          <QuoteItemBaseFields 
            register={register} 
            errors={errors} 
          />
          
          <ProductDetailFields 
            register={register} 
            type={watchType} 
          />
          
          <PricingFields 
            register={register} 
            errors={errors} 
          />
          
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
