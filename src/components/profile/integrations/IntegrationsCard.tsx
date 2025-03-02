
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface IntegrationsCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const IntegrationsCard: React.FC<IntegrationsCardProps> = ({ 
  title, 
  description, 
  children 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default IntegrationsCard;
