import Component from "../../framework/component";
import Vector from "../../other/vector";

export default class WSCamera extends Component {
   private coords: Vector = new Vector(0, 0);

   constructor() {
      super();
   }

   public getCoords(): Vector { 
      return this.coords.copy();
   }

   public setCoords(coords: Vector): void { 
      this.coords.x = coords.x;
      this.coords.y = coords.y;
   }


}