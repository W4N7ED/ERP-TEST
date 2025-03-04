
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormRegister } from "react-hook-form";

interface ProductDetailFieldsProps {
  register: UseFormRegister<any>;
  type: string;
}

const ProductDetailFields: React.FC<ProductDetailFieldsProps> = ({
  register,
  type
}) => {
  if (type !== "Produit") return null;
  
  return (
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
  );
};

export default ProductDetailFields;
