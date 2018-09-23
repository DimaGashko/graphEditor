import Component from "../framework/component";
import Template from "../framework/template";
import Project from "./project";

export default class ProjectManager extends Component {
   private projects: Project[] = [];

   constructor() { 
      super();
      this.init();
   }

   public createNewProject(name?: string): void { 
      let project = new Project();
      if (name) project.rename(name);

      this.projects.push(project);
   }

   private init(): void { 
      this.initProjects();
   }

   private initProjects(): void {
      this.createNewProject();
   }
}