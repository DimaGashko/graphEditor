import Component from "../framework/component";
import Project from "./project";
import { tmpl } from "../other/functions"

export default class ProjectManager extends Component {
   public projects: Project[] = [];

   constructor() { 
      super();
   }

   public init(root: HTMLElement): void {
      this.createParametrs(root);
      this.getElements();
      this.initProjects();
   }

   public createNewProject(name?: string): void { 
      let project = new Project();
      if (name) project.rename(name);

      this.projects.push(project);

      this.addProjectToProjectList(project);
   }

   private addProjectToProjectList(project: Project): void { 
      <HTMLElement>(this.els.projectList).insertAdjacentHTML(
         'beforeEnd', tmpl('project_in_list_tmpl', project)
      );
   }

   private initProjects(): void {
      this.createNewProject();
   }

   private getElements(): void { 
      let r: HTMLElement = this.els.root;

      this.els.projectList = r.querySelector('.project_manager__project_list');
   }

   private createParametrs(root: HTMLElement) { 
      this.els.root = root;
   }

}