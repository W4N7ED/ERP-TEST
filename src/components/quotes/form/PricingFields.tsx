
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface PricingFieldsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

const PricingFields: React.FC<PricingFieldsProps> = ({
  register,
  errors
}) => {
  return (
    <>
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
            <p className="text-sm text-red-500">{errors.unitPrice.message as string}</p>
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
            <p className="text-sm text-red-500">{errors.quantity.message as string}</p>
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
            <p className="text-sm text-red-500">{errors.discount.message as string}</p>
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
            <p className="text-sm text-red-500">{errors.taxRate.message as string}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PricingFields;
