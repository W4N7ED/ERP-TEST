
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

type LoginButtonProps = {
  handleLogin: () => void;
};

const LoginButton = ({ handleLogin }: LoginButtonProps) => {
  return (
    <Button onClick={handleLogin} className="flex items-center gap-2">
      <LogIn size={16} />
      <span>Se connecter</span>
    </Button>
  );
};

export default LoginButton;
