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
      this.initEvents();
      this.initProjects();
   }

   public createNewProject(): Project { 
      let project = new Project();
      this.projects.push(project);

      this.initProjectEvents(project);

      this.trigger('change');
      return project;
   }

   public render(): void {
      this.renderProjectList();
   }

   private initProjectEvents(project: Project): void { 
      project.addEvent('change', () => { 
         this.render();
      });
   }

   private initEvents(): void { 
      this.addEvent('change', () => { 
         this.render();
      });
   }

   private renderProjectList(): void { 
      console.log('asdf');
      const html = tmpl('project_list_tmpl', {
         projects: this.projects
      });
      (<HTMLElement>this.els.projectList).innerHTML = html;
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