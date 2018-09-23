import Component from "../framework/component";

let nextId = 0;

export default class Project extends Component {
   private id: number = nextId++;
   private name: string = `New Project ${this.id + 1}`;

   constructor() { 
      super(); 
   }

   /**
    * Устанавливает имя проекта
    * 
    * @param name новое название
    * @returns {boolean} удалось ли выполнить переименование
    */
   rename(name: string): boolean {
      name = name.trim().slice(0, 10);
      if (name.length < 1) return false;

      this.name = name;
      return true;
   }

}