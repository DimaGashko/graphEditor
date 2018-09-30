import Graph from "../../../math/graph/graph";
import WSVertex from "./ws_vertex";
import Vector from "../../../math/vector/vector";
import Vertex from "../../../math/graph/vertex";
import Edge from "../../../math/graph/edge";
import WSEdge from "./ws_edge";
import { getRandomVector } from "../../../math/math";

export default class WSGraph {
   public graph: Graph = new Graph();

   constructor() {

   }

   public createByGraph(graph: Graph): void {
      graph.getEdges().forEach((edge, i) => { 
         if (edge.targ instanceof WSEdge) return;

         edge.targ = new WSEdge(`e${i + 1}`);
      });

      graph.getVertices().forEach((vertex, i) => { 
         if (vertex.targ instanceof WSVertex) return;

         vertex.targ = new WSVertex(getRandomVector(-300, 300), `v${i + 1}`);
      });

      this.graph = graph;
   }

}