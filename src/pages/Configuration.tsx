
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ConfigurationForm } from "@/components/configuration/ConfigurationForm";
import { useConfigurationState } from "@/hooks/useConfigurationState";

const Configuration = () => {
  const configState = useConfigurationState();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Configuration de l'application</CardTitle>
            <CardDescription className="text-center">
              Configurez les paramètres de votre application pour commencer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ConfigurationForm {...configState} />
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            <p>Cette configuration sera stockée localement sur votre appareil Linux</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Configuration;
