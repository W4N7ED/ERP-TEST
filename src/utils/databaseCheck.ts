
import { storageService } from "@/services/storageService";

/**
 * Checks if the application is using a real database connection
 * instead of mock data
 */
export const isUsingRealDatabase = (): boolean => {
  // Check if database configuration exists in storage
  const dbConfig = storageService.getData("db_config");
  
  // If there's no config or it's specifically set to use mock data,
  // return false, otherwise return true
  if (!dbConfig || dbConfig.dbType === "mock") {
    return false;
  }
  
  return true;
};

/**
 * Checks if the application should use mock data
 */
export const shouldUseMockData = (): boolean => {
  return !isUsingRealDatabase();
};
