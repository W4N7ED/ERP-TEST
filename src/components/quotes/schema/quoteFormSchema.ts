
import { z } from "zod";

// Définition du schéma de validation
export const quoteFormSchema = z.object({
  clientName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  clientCompany: z.string().optional(),
  clientAddress: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  clientEmail: z.string().email("Email invalide"),
  clientPhone: z.string().min(8, "Numéro de téléphone invalide"),
  clientVatNumber: z.string().optional(),
  expirationDate: z.date(),
  projectId: z.number().optional(),
  interventionId: z.number().optional(),
  notes: z.string().optional(),
  terms: z.string().optional(),
});

// Schéma pour les informations détaillées sur les produits
export const productDetailSchema = z.object({
  brand: z.string().optional(),
  model: z.string().optional(),
  application: z.string().optional(),
  license: z.string().optional(),
  priceHT: z.number().optional(),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
export type ProductDetailData = z.infer<typeof productDetailSchema>;

