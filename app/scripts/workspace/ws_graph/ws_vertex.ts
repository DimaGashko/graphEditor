import WSGraphComponent from "../ws_graph_component";
import Vector from "../../modelComponents/vector";

export interface IVertextStyle { 
   background: string;
   borderWidth: number;
   fontFamily: string,
   fontVariant: string,
   fontSize: number,
   lineColor: string,
   color: string;
}

export default class WSVertex extends WSGraphComponent {
   public radius: Vector = new Vector(22, 22);

   constructor(
      name: string,
      public coords: Vector = new Vector()
   ) {
      super(name || 'v');
   }

   public style: IVertextStyle = {
      background: '#fff',
      borderWidth: 3, 
      fontFamily: '"Arial Black", Gadget, sans-serif',
      fontSize: 14,
      fontVariant: 'normal',
      lineColor: '#000',
      color: '#000',
   }

   /**
    * Проверяет, находится ли переданная точка внутри
    */
   public checkContainPoint(point: Vector) { 
      let a = point.x - this.coords.x;
      let b = point.y - this.coords.y;

      return (a * a + b * b <= this.radius.x * this.radius.x);
   }

}