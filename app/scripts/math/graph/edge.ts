import Vertex from "./vertex";

/**
 * Ребро графа
 * 
 * @class
 */
export default class Edge { 
   constructor(
      public v1: Vertex,
      public v2: Vertex,
      public targ?: any
   ) { 

      
      
   }
}