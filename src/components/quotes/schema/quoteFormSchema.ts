
import { z } from "zod";

// Définition du schéma de validation
export const quoteFormSchema = z.object({
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

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
