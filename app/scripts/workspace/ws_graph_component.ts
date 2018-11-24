export default class WSGraphComponent {
   private minNameLen: number = 1;
   private maxNameLen: number = 10;

   protected name: string = '';
   
   constructor(name?: string) { 
      if (name !== undefined) this.setName(name);
   }

   public getName(): string { 
      return this.name;
   }

   public setName(name: string) {
      name = name.trim();

      if (name.length < this.minNameLen) {
         return;
      }

      this.name = name.slice(0, this.maxNameLen + 1);
   }
}