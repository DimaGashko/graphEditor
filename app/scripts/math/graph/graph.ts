import Vertex from "./vertex";
import Edge from "./edge";

/**
 * Граф
 * 
 * @class
 */
export default class Graph { 
   private vertexis: Vertex[] = [];
   private edges: Edge[] = [];

   constructor() { 

   }

   public addVertex(vertex: Vertex): void { 
      if (this.vertexis.indexOf(vertex) !== -1) return;

      this.vertexis.push(vertex);
   }

   public addEdge(edge: Edge): void { 
      if (this.edges.indexOf(edge) !== -1) return;

      this.edges.push(edge);

      this.addVertex(edge.v1);
      this.addVertex(edge.v2);
   }

}