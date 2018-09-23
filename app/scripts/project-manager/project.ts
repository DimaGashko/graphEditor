import Component from "../framework/component";

let nextId = 0;

export default class Project extends Component {
   private id: number = nextId++;
   private name: string = `Project ${this.id + 1}`;

   public selected: boolean = false; 

   constructor() { 
      super(); 
   }

   /**
    * Устанавливает имя проекта
    * 
    * @param name новое название
    * @returns {boolean} удалось ли выполнить переименование
    */
   public rename(name: string): boolean {
      name = name.trim().slice(0, 50);
      if (name.length < 1) return false;

      this.name = name;
      return true;
   }

   public getName(): string { 
      return this.name;
   }

   public getId(): number { 
      return this.id;
   }

}