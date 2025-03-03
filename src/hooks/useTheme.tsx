
import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    // Essaie de récupérer le thème du localStorage
    const savedTheme = localStorage.getItem('theme');
    // Si un thème est sauvegardé et est valide, on l'utilise
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      return savedTheme as 'light' | 'dark' | 'system';
    }
    // Sinon on utilise light par défaut
    return 'light';
  });

  // Appliquer le thème au document
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Supprimer les classes existantes
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      // Vérifier la préférence du système
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemPreference);
    } else {
      // Ajouter la classe pour le thème sélectionné
      root.classList.add(theme);
    }
    
    // Sauvegarder le thème dans localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setThemeWithSave = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };

  return { theme, setTheme: setThemeWithSave };
}
