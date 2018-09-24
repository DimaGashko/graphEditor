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
      public type: 'uni' | 'bi' = 'bi', 
      public weight: number = 1,
      public targ?: any
   ) { 

      
      
   }
}