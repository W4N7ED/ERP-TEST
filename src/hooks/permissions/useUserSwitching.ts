
import { User } from './types';

export const useUserSwitching = (
  allUsers: User[],
  setCurrentUser: React.Dispatch<React.SetStateAction<User & { isAuthenticated?: boolean }>>
) => {
  // Switch to a different user (for demonstration purposes)
  const switchUser = (userId: number) => {
    const user = allUsers.find(u => u.id === userId);
    if (user) {
      setCurrentUser({ ...user, isAuthenticated: true });
    }
  };

  return {
    switchUser
  };
};
