import Component from "../framework/component";
import Project from "./project";
import { tmpl } from "../other/functions"

export default class ProjectManager extends Component {
   private projects: Project[] = [];
   private selectedProject: Project|null = null;

   constructor() { 
      super();
   }

   public init(root: HTMLElement): void {
      this.createParametrs(root);
      this.getElements();
      this.initEvents();
      this.initProjects();
   }

   public createNewProject(name?: string): Project { 
      let project = new Project();
      project.init(this.els.projects);

      if (name) project.rename(name);
      this.projects.push(project);

      this.initProjectEvents(project);
      this.selectProject(project);

      this.trigger('change');
      return project;
   }

   public render(): void {
      this.renderProjectList();
   }

   public getSelectedProject(): Project|null { 
      return this.selectedProject;
   }

   public getProjectById(id: number): Project|null { 
      return this.projects
         .filter(project => project.getId() === id)[0] || null;
   }

   private selectProject(project: Project): void { 
      if (this.getSelectedProject() === project) return;

      this.selectedProject = project;
      this.showProject(project);
      this.trigger('change');  
   }

   private closeProject(project: Project): void {
      if (this.getSelectedProject() === project) { 
         
      }

      project.close();
      this.trigger('change');  
   }

   private showProject(project: Project): void {
      this.projects.forEach(project => project.hide());
      project.show();
   }

   private selectProjectById(id: number): void { 
      const project = this.getProjectById(id);
      if (!project) return;

      this.selectProject(project);
   }

   private closeProjectById(id: number): void { 
      const project = this.getProjectById(id);
      if (!project) return;

      this.closeProject(project);
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

      (<HTMLElement>this.els.root).addEventListener('click', (event: MouseEvent) => { 
         const targ = <Element>event.target;
         if (!targ) return;

         const projectInList = targ.closest('.project_in_list');
         
         if (projectInList) {
            if (targ.closest('.project_in_list__select')) {
               const id = projectInList.getAttribute('data-project-id');
               if (id) this.selectProjectById(parseInt(id));
         
            } else if (targ.closest('.project_in_list__close')) {
               const id = projectInList.getAttribute('data-project-id');
               if (id) this.closeProjectById(parseInt(id));
            }
         }

      });
   }

   private renderProjectList(): void { 
      const html = tmpl('project_list_tmpl', {
         projects: this.projects,
         select: this.getSelectedProject(),
      });
      (<HTMLElement>this.els.projectList).innerHTML = html;
   }

   private initProjects(): void {
      
   }

   private getElements(): void { 
      let r: HTMLElement = this.els.root;

      this.els.projectList = r.querySelector('.project_manager__project_list');
      this.els.projects = r.querySelector('.project_manager__projects');
   }

   private createParametrs(root: HTMLElement) { 
      this.els.root = root;
   }

}