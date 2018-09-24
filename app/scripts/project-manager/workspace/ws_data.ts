import Vector from "../../math/vector/vector";
import WSGraph from "./ws_graph/ws_graph";


export default class WSData {
   public camera: Vector = new Vector(0, 0);
   public zoom: Vector = new Vector(1, 1);
   public wsSize: Vector = new Vector(150, 150); 

   public wsGraph: WSGraph = new WSGraph();

   constructor() {
      
   }

}