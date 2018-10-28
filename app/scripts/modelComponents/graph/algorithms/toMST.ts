import Graph from "../graph";
import Edge from "../edge";

/**
 * Возвращает минимальное остовное дерево графа
 * Основан на алгоритме Ярника-Прима-Дейкстры
 * 
 * Вес ребра берется из свойства Edge.targ.weight
 * либо считается равным 1, если такого свойства нет.
 * 
 * @param graph Связный неориентированный граф
 * @returns минимальное остовное дерево графа
 */
export default function toMST<E, V>(graph: Graph<E, V>): Graph<E, V> {
   const mst = new Graph<E, V>();

   const vertices = graph.getVertices();
   const edges = graph.getEdges();
   
   const firstV = vertices.pop();
   const vEdges = graph.getVEdges(firstV);
   const minEdge = getMinEdge<E, V>(vEdges);



   return new Graph<E, V>();
}

function getMinEdge<E, V>(edges: Edge<E, V>[]) {
   let edge = edges[0];
   let minWeight = getEdgeWeight(edge);

   for (let i = 1; i < edges.length; i++) { 
      const weight = getEdgeWeight(edges[i]);

      if (weight < minWeight) { 
         minWeight = weight;
         edge = edges[i];
      }
   }

}

function getEdgeWeight<E, V>(edge: Edge<E, V>) { 
   return (edge.targ && (<any>edge.targ).weight)
      ? (<any>edge.targ).weight : 1;
}