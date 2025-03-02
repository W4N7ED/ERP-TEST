
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { QuoteFormData } from "../schema/quoteFormSchema";

interface QuoteDetailsSectionProps {
  register: UseFormRegister<QuoteFormData>;
  setValue: UseFormSetValue<QuoteFormData>;
  expirationDate: Date;
}

export const QuoteDetailsSection: React.FC<QuoteDetailsSectionProps> = ({
  register,
  setValue,
  expirationDate,
}) => {
  return (
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
                !expirationDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {expirationDate ? (
                format(expirationDate, "PPP", { locale: fr })
              ) : (
                <span>Sélectionner une date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={expirationDate}
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
  );
};
