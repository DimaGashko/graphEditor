import Component from "../../framework/component";
import Vector from "../../other/vector";

export default class WSData extends Component {
   public camera: Vector = new Vector(0, 0);
   public zoom: Vector = new Vector(1, 0.5);
   public wsSize: Vector = new Vector(150, 150);

   public getOffset(): Vector {
      return this.wsSize.div(2);
   }

   constructor() {
      super();
   }

}