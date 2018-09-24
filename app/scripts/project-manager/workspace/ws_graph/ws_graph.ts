import Graph from "../../../math/graph/graph";
import WSData from "../ws_data";

export default class WSGraph { 
   private graph: Graph = new Graph();

   constructor(public data: WSData) { 

   }
}