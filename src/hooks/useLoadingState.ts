
import { useState, useEffect } from 'react';

export const useLoadingState = (delay = 800) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return { isLoading };
};
