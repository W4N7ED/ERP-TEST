
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomButton } from "@/components/ui/custom-button";

const NotesCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
        <CardDescription>Informations supplémentaires</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Aucune note disponible pour ce fournisseur. Cliquez sur Modifier pour ajouter des notes.
        </p>
        <div className="mt-4">
          <CustomButton variant="outline" size="sm">
            Modifier les notes
          </CustomButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotesCard;
