import Component from "../../framework/component";
import WSData from "./ws_data";
import Vector from "../../other/vector";

export default class WSConverter extends Component {
   
   constructor(private data: WSData) { 
      super();
   }

   public toReal(displayCoords: Vector): Vector { 
      return new Vector(0, 0);
   }

   public toDisplay(realCoords: Vector): Vector { 
      return new Vector(0, 0);
   }
}