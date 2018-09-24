import Vector from "../../other/vector";
 
export default class WSData {
   public camera: Vector = new Vector(0, 0);
   public zoom: Vector = new Vector(1, 1);
   public wsSize: Vector = new Vector(150, 150);

   constructor() {
      (<any>window).a = this;
   }

}