
import { usePhaseManagement } from "./usePhaseManagement";
import { useTaskManagement } from "./useTaskManagement";
import { useTeamManagement } from "./useTeamManagement";
import { ProjectState, ProjectActions } from "../types";

export const useProjectContent = (
  state: ProjectState,
  actions: ProjectActions
) => {
  const phaseManagement = usePhaseManagement(state, actions);
  const taskManagement = useTaskManagement(state, actions);
  const teamManagement = useTeamManagement(state, actions);

  return {
    ...phaseManagement,
    ...taskManagement,
    ...teamManagement
  };
};
