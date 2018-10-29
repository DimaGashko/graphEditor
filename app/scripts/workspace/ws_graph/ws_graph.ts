import { getRandomVector } from "../../modelComponents/math";
import Graph from "../../modelComponents/graph/graph";
import WSVertex from "./ws_vertex";
import WSEdge from "./ws_edge";

export default class WSGraph {
   private _graph = new Graph<WSEdge, WSVertex>();
   public get graph() {
      return this._graph;
   }
   public set graph(value) {
      this._graph = value;
   }

   constructor() {

   }

}