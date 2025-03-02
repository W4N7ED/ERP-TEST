
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteFormSchema, QuoteFormData } from "./schema/quoteFormSchema";
import { ClientFormSection } from "./form-sections/ClientFormSection";
import { QuoteDetailsSection } from "./form-sections/QuoteDetailsSection";
import { format } from "date-fns";

interface AddQuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddQuote: (quoteData: {
    client: {
      name: string;
      company?: string;
      address: string;
      email: string;
      phone: string;
    };
    expirationDate: string;
    projectId?: number;
    interventionId?: number;
    notes?: string;
    terms?: string;
  }) => void;
}

export const AddQuoteDialog: React.FC<AddQuoteDialogProps> = ({
  open,
  onOpenChange,
  onAddQuote,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 jours
      terms: "Ce devis est valable 30 jours. Paiement à 30 jours après acceptation.",
    },
  });

  // Use watch to get the current value of expirationDate
  const expirationDate = watch("expirationDate");

  const onSubmit = async (data: QuoteFormData) => {
    onAddQuote({
      client: {
        name: data.clientName,
        company: data.clientCompany,
        address: data.clientAddress,
        email: data.clientEmail,
        phone: data.clientPhone,
      },
      expirationDate: format(data.expirationDate, "yyyy-MM-dd"),
      projectId: data.projectId,
      interventionId: data.interventionId,
      notes: data.notes,
      terms: data.terms,
    });
    
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nouveau Devis</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <ClientFormSection 
            register={register} 
            errors={errors} 
          />
          
          <QuoteDetailsSection 
            register={register}
            setValue={setValue}
            expirationDate={expirationDate}
          />
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Créer le devis
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
