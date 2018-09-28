import Graph from "../../../math/graph/graph";
import WSVertex from "./ws_vertex";
import Vector from "../../../math/vector/vector";
import Vertex from "../../../math/graph/vertex";
import Edge from "../../../math/graph/edge";
import WSEdge from "./ws_edge";
import { getRandomVector } from "../../../math/geometry/geometry";

export default class WSGraph {
   public graph: Graph = new Graph();

   constructor() {

   }

   public createDemo() {
      let v1 = new Vertex(new WSVertex(new Vector(-200, 100), 'v1'));
      let v2 = new Vertex(new WSVertex(new Vector(0, 100), 'v2'));
      let v3 = new Vertex(new WSVertex(new Vector(130, -70), 'v3'));
      let v4 = new Vertex(new WSVertex(new Vector(150, 200), 'v4'));

      this.graph.addEdge(new Edge(v2, v1, 'uni', 1, new WSEdge('e1')));
      this.graph.addEdge(new Edge(v2, v3, 'uni', 1, new WSEdge('e2')));
      this.graph.addEdge(new Edge(v1, v3, 'bi', 2, new WSEdge('e3')));
      this.graph.addEdge(new Edge(v2, v4, 'uni', 1, new WSEdge('e4')));
      this.graph.addEdge(new Edge(v3, v4, 'bi', 1, new WSEdge('e5')));
      this.graph.addEdge(new Edge(v3, v3, 'uni', 1, new WSEdge('e6')));
      this.graph.addEdge(new Edge(v3, v3, 'bi', 3, new WSEdge('e7')));
      this.graph.addEdge(new Edge(v3, v3, 'uni', 3, new WSEdge('e8')));
      this.graph.addEdge(new Edge(v1, v3, 'uni', 1, new WSEdge('e9')));
      this.graph.addEdge(new Edge(v4, v3, 'uni', 1, new WSEdge('e10')));
      this.graph.addEdge(new Edge(v3, v4, 'uni', 1, new WSEdge('e11')));
   }

   public createByAdjacencyMatrix(matrix: number[][]): void { 
      this.graph = Graph.parseAdjacencyMatrix(matrix);

      this.graph.getEdges().forEach((edge, i) => { 
         edge.targ = new WSEdge(`e${i + 1}`);
      });

      this.graph.getVertices().forEach((vertex, i) => { 
         vertex.targ = new WSVertex(getRandomVector(-300, 300), `v${i + 1}`);
      });
   }

}