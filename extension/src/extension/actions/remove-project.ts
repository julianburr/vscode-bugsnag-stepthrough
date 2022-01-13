import { ActionArgs } from ".";
import { PROJECTS_KEY } from "../constants";

export const removeProject = {
  name: "removeProject",
  handler: ({ context, message }: ActionArgs) => {
    const projects = (context.workspaceState.get(PROJECTS_KEY) ||
      []) as string[];

    const newProjects = projects.filter((p) => p !== message.data);
    context.workspaceState.update(PROJECTS_KEY, newProjects);

    return newProjects;
  },
};
