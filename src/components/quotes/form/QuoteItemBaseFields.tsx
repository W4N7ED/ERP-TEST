
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface QuoteItemBaseFieldsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

const QuoteItemBaseFields: React.FC<QuoteItemBaseFieldsProps> = ({
  register,
  errors
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Nom*</Label>
        <Input id="name" {...register("name")} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message as string}</p>
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
          <p className="text-sm text-red-500">{errors.description.message as string}</p>
        )}
      </div>
    </>
  );
};

export default QuoteItemBaseFields;
