import Component from "../framework/component";
import Project from "./project";
export default class ProjectManager extends Component {
    private projects;
    private selectedProject;
    constructor();
    init(root: HTMLElement): void;
    createNewProject(): Project;
    render(): void;
    getSelectedProject(): Project | null;
    private selectProject;
    private selectProjectById;
    private initProjectEvents;
    private initEvents;
    private renderProjectList;
    private initProjects;
    private getElements;
    private createParametrs;
}
//# sourceMappingURL=project-manager.d.ts.map