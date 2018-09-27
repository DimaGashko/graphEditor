import Vector from "../../math/vector/vector";
import WSGraph from "./ws_graph/ws_graph";
import WSZoom from "./zoom";


export default class WSData {
   private defCamera: Vector = new Vector(0, 0); 

   public camera: Vector = this.defCamera.copy();
   public zoom: WSZoom = new WSZoom();
   public wsSize: Vector = new Vector(150, 150); 

   public wsGraph: WSGraph = new WSGraph();

   public background: string = '#f8f8f8';

   constructor() {
      
   }

}