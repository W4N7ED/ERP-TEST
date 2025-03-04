
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Clock } from "lucide-react";
import { Supplier } from "@/types/inventory";

interface ContactCardProps {
  supplier: Supplier;
}

const ContactCard: React.FC<ContactCardProps> = ({ supplier }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact</CardTitle>
        <CardDescription>Informations de contact</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-full text-primary">
            <Mail size={18} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <a href={`mailto:${supplier.email}`} className="text-primary hover:underline">
              {supplier.email}
            </a>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-full text-primary">
            <Phone size={18} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Téléphone</p>
            <a href={`tel:${supplier.phone}`} className="hover:underline">
              {supplier.phone}
            </a>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-full text-primary">
            <Clock size={18} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Délai de livraison moyen</p>
            <p className="font-medium">{supplier.deliveryTime} jours</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
