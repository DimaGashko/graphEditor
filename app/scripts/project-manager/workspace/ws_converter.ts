import Component from "../../framework/component";
import WSData from "./ws_data";
import Vector from "../../other/vector";

export default class WSConverter extends Component {
   
   constructor(private data: WSData) { 
      super();
   }

   public toReal(display: Vector): Vector { 
      let result = display.sub(this.data.getOffset());
      result = result.diScale(this.data.zoom);
      result = result.sub(this.data.camera);

      return result;
   }

   public toDisplay(real: Vector): Vector { 
      let result = real.sub(this.data.camera);
      result = result.scale(this.data.zoom);
      result = result.add(this.data.getOffset());

      return result;
   }
}