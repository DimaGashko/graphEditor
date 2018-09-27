import WSData from "./ws_data";
import Vector from "../../math/vector/vector"; 

export default class WSConverter {
   
   constructor(private data: WSData) { 
      
   }

   public toReal(display: Vector): Vector { 
      return display.sub(this.data.wsSize.div(2))
         .diScale(this.data.zoom.get())
         .sub(this.data.camera);
   }

   public toDisplay(real: Vector): Vector { 
      return real.sub(this.data.camera)
         .scale(this.data.zoom.get())
         .add(this.data.wsSize.div(2));
   }
}