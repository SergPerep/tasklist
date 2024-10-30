import { action, Action } from "easy-peasy";
import { Project } from "src/types";

export type ProjectModel = {
    projects: Project[],
    getProject: (projects: Project[], id: number) => undefined | Project,
    setProjects: Action<ProjectModel, Project[]>
}

const projectModel: ProjectModel = {
    projects: [/*{
            id: 3, 
            name: "Work", 
            color_id: 1
        }, ..
        */],
    getProject: (projects, id) => {
        return projects
            .find(project => project.id === id)
    },
    setProjects: action((state, folders) => {
        state.projects = folders;
    })
};

export default projectModel;