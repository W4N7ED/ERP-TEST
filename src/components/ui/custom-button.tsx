
import React from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface CustomButtonProps extends ButtonProps {
  isLoading?: boolean;
  icon?: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary" | "success";
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variant = "default", size, isLoading, icon, children, ...props }, ref) => {
    // Map custom variants to built-in variants or apply specific classes
    let variantClass;
    switch (variant) {
      case "primary":
        variant = "default";
        variantClass = "bg-primary hover:bg-primary/90 text-white";
        break;
      case "success":
        variant = "default";
        variantClass = "bg-green-500 hover:bg-green-600 text-white";
        break;
      default:
        variantClass = "";
    }

    return (
      <Button
        ref={ref}
        variant={variant as any}
        size={size}
        className={cn(
          "font-medium rounded-lg transition-all duration-200 transform hover:translate-y-[-1px]",
          variantClass,
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : icon ? (
          <span className="mr-2">{icon}</span>
        ) : null}
        {children}
      </Button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export { CustomButton };
