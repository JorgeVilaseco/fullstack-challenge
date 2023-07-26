import { createContext } from "react";

export type ProjectsContextType = {
  projectsContext: string | undefined;
  setProjectsContext: (context: string) => void;
};

export const ProjectsContext = createContext<ProjectsContextType>({
  projectsContext: undefined,
  setProjectsContext: () => {},
});
