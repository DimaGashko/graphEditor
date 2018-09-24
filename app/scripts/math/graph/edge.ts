import Vertex from "./vertex";

/**
 * Ребро графа
 * 
 * @class
 */
export default class Edge { 
   constructor(
      public begin: Vertex,
      public end: Vertex,
      public targ?: any
   ) { 

      
      
   }
}