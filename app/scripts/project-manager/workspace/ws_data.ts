import Vector from "../../math/vector/vector";
import WSGraph from "./ws_graph/ws_graph";
import WSZoom from "./zoom";
import WSCamera from "./ws_camera";


export default class WSData {
   public wsSize: Vector = new Vector(150, 150); 
   public background: string = '#f8f8f8';

   public wsGraph: WSGraph = new WSGraph();
   public camera: WSCamera = new WSCamera();
   public zoom: WSZoom = new WSZoom();
}