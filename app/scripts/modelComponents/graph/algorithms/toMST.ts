import Graph from "../graph";
import Edge from "../edge";
import Vertex from "../vertex";

/**
 * Возвращает минимальное остовное дерево графа
 * 
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
   if (!vertices) return mst;

   mst.addVertex(vertices[0]);
   step(vertices[0], vertices, graph, mst);

   return mst;
}

function step<E, V>(
   vertex: Vertex<V>,
   vertices: Vertex<V>[],
   graph: Graph<E, V>,
   mst: Graph<E, V>
) { 
   //Ребра, что инцидентны вершине, но еще не находятся в mst
   const edges = graph.getVEdges(vertex).filter(e => !mst.containsEdge(e));
   const minEdge = getMinEdge(edges);

   if (!minEdge) return;
   mst.addEdge(minEdge);

   step(minEdge.v1, vertices, graph, mst);
   step(minEdge.v2, vertices, graph, mst);
}

function getMinEdge<E, V>(edges: Edge<E, V>[]): Edge<E, V> {
   if (!edges.length) return null;
   
   let minEdge = edges[0];
   let minWeight = getEdgeWeight(minEdge);

   for (let i = 1; i < edges.length; i++) { 
      const weight = getEdgeWeight(edges[i]);

      if (weight < minWeight) { 
         minWeight = weight;
         minEdge = edges[i];
      }
   }

   return minEdge;
}

function getEdgeWeight<E, V>(edge: Edge<E, V>) { 
   return (edge.targ && (<any>edge.targ).weight)
      ? (<any>edge.targ).weight : 1;
}