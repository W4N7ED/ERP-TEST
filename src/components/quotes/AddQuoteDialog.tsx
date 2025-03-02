
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

// Définition du schéma de validation
const quoteFormSchema = z.object({
  clientName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  clientCompany: z.string().optional(),
  clientAddress: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  clientEmail: z.string().email("Email invalide"),
  clientPhone: z.string().min(8, "Numéro de téléphone invalide"),
  expirationDate: z.date(),
  projectId: z.number().optional(),
  interventionId: z.number().optional(),
  notes: z.string().optional(),
  terms: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

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
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 jours
      terms: "Ce devis est valable 30 jours. Paiement à 30 jours après acceptation.",
    },
  });

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
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium leading-none">Détails du Devis</h3>
            
            <div className="space-y-2">
              <Label>Date d'expiration*</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !register("expirationDate") && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {register("expirationDate").value ? (
                      format(new Date(register("expirationDate").value), "PPP", { locale: fr })
                    ) : (
                      <span>Sélectionner une date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={register("expirationDate").value}
                    onSelect={(date) => date && setValue("expirationDate", date)}
                    initialFocus
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                {...register("notes")}
                placeholder="Informations supplémentaires"
                className="h-20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="terms">Conditions générales</Label>
              <Textarea
                id="terms"
                {...register("terms")}
                className="h-20"
              />
            </div>
          </div>
          
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
