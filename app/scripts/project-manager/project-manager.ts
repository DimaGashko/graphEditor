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

   public createNewProject(): Project { 
      let project = new Project();
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

   private selectProject(project: Project): void { 
      this.selectedProject = project;
      this.render();   
   }

   private selectProjectById(id: number): void { 
      const project = this.projects.filter(project => project.getId() === id)[0];
      if (!project) return;

      this.selectProject(project);
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
         
         if (projectInList && targ.closest('.project_in_list__select')) { 
            const id = projectInList.getAttribute('data-project-id');
            if (id) this.selectProjectById(parseInt(id));
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