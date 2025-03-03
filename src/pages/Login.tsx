import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { usePermissions } from '@/hooks/usePermissions';
import { useAppName } from '@/components/AppNameProvider';
import { CustomButton } from '@/components/ui/custom-button'; 
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, currentUser, authError } = usePermissions();
  const { appName } = useAppName();

  useEffect(() => {
    console.log("Login component - Auth state changed:", currentUser);
    if (currentUser && currentUser.isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      console.log("Redirecting to:", from);
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        variant: "destructive",
        title: "Champs obligatoires",
        description: "Veuillez remplir tous les champs",
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log("Tentative de connexion avec:", username, password);
      // Si le nom d'utilisateur ne contient pas @, considérez-le comme un nom d'utilisateur simple
      const emailOrUsername = username.includes('@') ? username : username;
      
      const success = await loginUser(emailOrUsername, password);
      
      if (success) {
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté",
        });
        
        const from = location.state?.from?.pathname || '/';
        console.log("Redirection vers:", from);
        navigate(from, { replace: true });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: "Nom d'utilisateur ou mot de passe incorrect",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Une erreur s'est produite. Veuillez réessayer.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">{appName}</CardTitle>
            <CardDescription className="text-center">
              Entrez vos identifiants pour vous connecter
            </CardDescription>
          </CardHeader>
          <CardContent>
            {authError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Nom d'utilisateur</Label>
                <Input
                  id="username"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <CustomButton 
                type="submit" 
                className="w-full" 
                isLoading={isLoading}
                variant="primary"
              >
                Se connecter
              </CustomButton>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Compte administrateur par défaut: admin@admin.fr / admin123
            </p>
            <p className="text-xs text-muted-foreground">
              Tous les utilisateurs: [nom d'utilisateur] / password123
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
