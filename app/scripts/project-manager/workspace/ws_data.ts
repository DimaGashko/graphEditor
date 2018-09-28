import Vector from "../../math/vector/vector";
import WSGraph from "./ws_graph/ws_graph";
import WSZoom from "./ws_zoom";
import WSCamera from "./ws_camera";


export default class WSData {
   public wsSize: Vector = new Vector(0, 0); 
   public background: string = '#f8f8f8';

   public wsGraph: WSGraph = new WSGraph();
   public camera: WSCamera = new WSCamera();
   public zoom: WSZoom = new WSZoom();
}