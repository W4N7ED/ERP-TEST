
import { User } from "@/types/permissions";
import { Intervention } from "@/types/intervention";
import { Project } from "@/types/project";

// Define localStorage keys
const USER_KEY = "current_user";
const ADMIN_CREDENTIALS_KEY = "admin_credentials";
const USER_AVATAR_KEY = "user_avatar";
const PROJECTS_KEY = "projects_data";
const INTERVENTIONS_KEY = "interventions_data";

// Service for managing data in localStorage
export const storageService = {
  // User operations
  getUser: (): User | null => {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  saveUser: (user: User): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser: (): void => {
    localStorage.removeItem(USER_KEY);
  },

  // Admin credentials operations
  getAdminCredentials: (): { email: string; password: string } | null => {
    const data = localStorage.getItem(ADMIN_CREDENTIALS_KEY);
    return data ? JSON.parse(data) : null;
  },

  saveAdminCredentials: (credentials: { email: string; password: string }): void => {
    localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(credentials));
  },

  // Avatar operations
  getUserAvatar: (): string | null => {
    return localStorage.getItem(USER_AVATAR_KEY);
  },

  saveUserAvatar: (avatarUrl: string): void => {
    localStorage.setItem(USER_AVATAR_KEY, avatarUrl);
  },

  // App configuration operations
  getAppConfiguration: (): any | null => {
    const data = localStorage.getItem("app_config");
    return data ? JSON.parse(data) : null;
  },

  saveAppConfiguration: (config: any): void => {
    localStorage.setItem("app_config", JSON.stringify(config));
  },

  // Projects operations
  getProjects: (): Project[] => {
    const data = localStorage.getItem(PROJECTS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveProjects: (projects: Project[]): void => {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  },

  // Interventions operations
  getInterventions: (): Intervention[] => {
    const data = localStorage.getItem(INTERVENTIONS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveInterventions: (interventions: Intervention[]): void => {
    localStorage.setItem(INTERVENTIONS_KEY, JSON.stringify(interventions));
  },

  // Generic data operations
  getData: (key: string): any | null => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  saveData: (key: string, data: any): void => {
    localStorage.setItem(key, JSON.stringify(data));
  },

  removeData: (key: string): void => {
    localStorage.removeItem(key);
  }
};
