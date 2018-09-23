import Component from "../framework/component";
import { tmpl } from "../other/functions";

let nextId = 0;

export default class Project extends Component {
   private maxProjectName: number = 50;

   private id: number = nextId++;
   private name: string = `Project ${this.id + 1}`;

   constructor() { 
      super();      
   }

   public init(parent: Element) { 
      this.create(parent);
   }

   public show() { 
      this.els.root.style.display = 'block';
   }

   public hide() { 
      this.els.root.style.display = 'none';
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
      //this.els. = r.querySelector('.');
   }

}