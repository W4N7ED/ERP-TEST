
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { QuoteFormData } from "../schema/quoteFormSchema";

interface ClientFormSectionProps {
  register: UseFormRegister<QuoteFormData>;
  errors: FieldErrors<QuoteFormData>;
}

export const ClientFormSection: React.FC<ClientFormSectionProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium leading-none">Informations Client</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="clientName">Nom*</Label>
          <Input id="clientName" {...register("clientName")} />
          {errors.clientName && (
            <p className="text-sm text-red-500">{errors.clientName.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="clientCompany">Entreprise</Label>
          <Input id="clientCompany" {...register("clientCompany")} />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="clientAddress">Adresse*</Label>
        <Input id="clientAddress" {...register("clientAddress")} />
        {errors.clientAddress && (
          <p className="text-sm text-red-500">{errors.clientAddress.message}</p>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="clientEmail">Email*</Label>
          <Input id="clientEmail" type="email" {...register("clientEmail")} />
          {errors.clientEmail && (
            <p className="text-sm text-red-500">{errors.clientEmail.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="clientPhone">Téléphone*</Label>
          <Input id="clientPhone" {...register("clientPhone")} />
          {errors.clientPhone && (
            <p className="text-sm text-red-500">{errors.clientPhone.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="clientVatNumber">Numéro de TVA</Label>
        <Input id="clientVatNumber" {...register("clientVatNumber")} placeholder="FR12345678900" />
      </div>
    </div>
  );
};
