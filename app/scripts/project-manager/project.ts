import Component from "../framework/component";

let nextId = 0;

export default class Project extends Component {
   private maxProjectName: number = 50;

   private id: number = nextId++;
   private name: string = `Project ${this.id + 1}`;

   constructor() { 
      super();     
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

}