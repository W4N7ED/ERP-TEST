
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const NotificationSettings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { toast } = useToast();

  const handleNotificationsChange = (enabled: boolean) => {
    setNotificationsEnabled(enabled);
    toast({
      title: "Notifications modifiées",
      description: `Les notifications sont maintenant ${enabled ? "activées" : "désactivées"}.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="notifications"
            checked={notificationsEnabled}
            onCheckedChange={handleNotificationsChange}
          />
          <Label htmlFor="notifications">Activer les notifications</Label>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="email-notif" defaultChecked />
            <Label htmlFor="email-notif">Notifications par email</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="push-notif" defaultChecked />
            <Label htmlFor="push-notif">Notifications push</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
