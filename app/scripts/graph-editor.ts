import Component from "./framework/component";
import ProjectManager from "./project-manager/project-manager";

export default class GraphEditor extends Component {
   public projectManager: ProjectManager = new ProjectManager();

   constructor(root: Element) { 
      super();
      this.initParametrs(root);
      this.getElements();
      this.init();
   }

   private init(): void { 
      this.projectManager.init(this.els.projectManager);
   }

   private getElements(): void { 
      let r: HTMLElement = this.els.root;

      this.els.projectManager = r.querySelector('.project_manager');
   }

   private initParametrs(root: Element): void { 
      this.els.root = root;
   }

}