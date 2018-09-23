export default class Vector {
   public x: number = 0;
   public y: number = 0;

   constructor(x: number, y: number) { 
      this.x = x;
      this.y = y;
   }

   public copy() { 
      return new Vector(this.x, this.y);
   }

}