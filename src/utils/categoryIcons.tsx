
import React from "react";
import {
  Printer,
  HardDrive,
  Router,
  Laptop,
  Cpu,
  Cable,
  Package
} from "lucide-react";
import Memory from "@/components/icons/Memory";

// Category icons mapping
export const categoryIcons: Record<string, React.ReactNode> = {
  "Imprimantes": <Printer size={18} />,
  "Stockage": <HardDrive size={18} />,
  "Réseau": <Router size={18} />,
  "Mémoire": <Memory size={18} />,
  "Ordinateurs": <Laptop size={18} />,
  "Accessoires": <Cable size={18} />,
  "Composants": <Cpu size={18} />
};

export const getCategoryIcon = (category: string): React.ReactNode => {
  return categoryIcons[category] || <Package size={18} />;
};
