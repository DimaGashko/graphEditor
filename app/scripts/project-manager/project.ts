import Component from "../framework/component";
import { tmpl } from "../other/functions";
import Workspace from "./workspace/workspace";

let nextId = 0;

export default class Project extends Component {
   private maxProjectName: number = 50;

   private id: number = nextId++;
   private name: string = `Project ${this.id + 1}`;

   private workspace: Workspace = new Workspace();

   constructor() { 
      super();      
   }

   public getWorkspace(): Workspace { 
      return this.workspace;
   }

   public init(parent: Element) { 
      this.create(parent);
      this.getElements();
      
      this.workspace.init(this.els.workspace);
   }

   public show() { 
      this.els.root.style.display = 'block';
      this.workspace.start();
   }

   public hide() { 
      this.els.root.style.display = 'none';
      this.workspace.stop();
   }

   /**
    * Устанавливает имя проекта
    * 
    * @param name новое название
    */
   public rename(name: string): void {
      name = name.trim().slice(0, this.maxProjectName);
      if (name.length < 1) return;
      this.name = name;

      this.trigger('rename', this);
      this.trigger('change', this);
   }

   public getName(): string { 
      return this.name;
   }

   public getId(): number { 
      return this.id;
   }

   public close(): void { 
      console.log(`${this.getName()} close`);
   }

   private create(parent: Element) { 
      this.els.parent = parent;

      const r = this.els.root = document.createElement('div');
      this.hide();

      r.className = "project";
      r.innerHTML = tmpl('project_tmpl', {
         project: this,
      });

      (<Element>this.els.parent).appendChild(r);
   }

   private getElements() { 
      let r: HTMLElement = this.els.root;
      this.els.workspace = r.querySelector('.workspace');
   }

}