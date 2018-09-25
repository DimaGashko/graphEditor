import Graph from "../../../math/graph/graph";
import WSVertex from "./ws_vertex";
import Vector from "../../../math/vector/vector";
import Vertex from "../../../math/graph/vertex";
import Edge from "../../../math/graph/edge";
import WSEdge from "./ws_edge";

export default class WSGraph { 
   public graph: Graph = new Graph();

   constructor() { 
      this.create();
   }

   private create() {
      let v1 = new Vertex(new WSVertex('v1', new Vector(-200, 100)));
      let v2 = new Vertex(new WSVertex('v2', new Vector(0, 100)));
      let v3 = new Vertex(new WSVertex('v3', new Vector(130, -70)));
      let v4 = new Vertex(new WSVertex('v4', new Vector(150, 200)));

      this.graph.addEdge(new Edge(v2, v1, 'uni', 1, new WSEdge('e1')));
      this.graph.addEdge(new Edge(v2, v3, 'uni', 1, new WSEdge('e2')));
      //this.graph.addEdge(new Edge(v1, v3, 'bi', 2, new WSEdge('e3')));
      this.graph.addEdge(new Edge(v2, v4, 'uni', 1, new WSEdge('e4')));
      //this.graph.addEdge(new Edge(v3, v4, 'bi', 1, new WSEdge('e5')));
      //this.graph.addEdge(new Edge(v2, v2, 'uni', 1, new WSEdge('e5')));
   }
}