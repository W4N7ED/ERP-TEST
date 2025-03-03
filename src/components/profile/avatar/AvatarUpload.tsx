
import React, { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { avatarService } from "@/services/avatarService";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AvatarUploadProps {
  currentAvatarUrl?: string | null;
  userName: string;
  onAvatarUpdate: (url: string) => void;
  size?: "sm" | "md" | "lg" | "xl";
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ 
  currentAvatarUrl, 
  userName, 
  onAvatarUpdate,
  size = "lg" 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(currentAvatarUrl || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Calculer les dimensions en fonction de la taille
  const getSizeClass = () => {
    switch (size) {
      case "sm": return "h-16 w-16";
      case "md": return "h-20 w-20";
      case "lg": return "h-24 w-24";
      case "xl": return "h-32 w-32";
      default: return "h-24 w-24";
    }
  };

  const getButtonSizeClass = () => {
    switch (size) {
      case "sm": return "size-sm";
      case "md": return "size-sm";
      case "lg": return "size-sm";
      case "xl": return "size-md";
      default: return "size-sm";
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    
    try {
      const { url, error } = await avatarService.uploadAvatar(file);
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      if (url) {
        const { success, error: updateError } = await avatarService.updateUserAvatarUrl(url);
        
        if (updateError) {
          toast.error("Erreur lors de la mise à jour du profil: " + updateError.message);
          return;
        }
        
        if (success) {
          setAvatarUrl(url);
          onAvatarUpdate(url);
          toast.success("Avatar mis à jour avec succès");
        }
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors du téléchargement de l'avatar");
      console.error("Error uploading avatar:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <div className="relative">
        <Avatar className={`${getSizeClass()} cursor-pointer hover:opacity-90 transition-opacity`} onClick={handleAvatarClick}>
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={userName} />
          ) : (
            <AvatarFallback className="text-xl bg-primary/10 text-primary">
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
          
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
              <Loader2 className="h-1/3 w-1/3 animate-spin text-white" />
            </div>
          )}
        </Avatar>
        
        <Button 
          type="button" 
          size={getButtonSizeClass() as any} 
          variant="outline" 
          className="absolute bottom-0 right-0 rounded-full p-1"
          onClick={handleAvatarClick}
          disabled={isUploading}
        >
          <Camera className="h-3 w-3 md:h-4 md:w-4" />
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground mt-1">
        Cliquez pour changer votre avatar
      </p>
    </div>
  );
};

export default AvatarUpload;
