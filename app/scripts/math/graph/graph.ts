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
      this.vertexis.push(vertex);
   }

   public addEdge(edge: Edge): void { 
      this.edges.push(edge);
   }

}