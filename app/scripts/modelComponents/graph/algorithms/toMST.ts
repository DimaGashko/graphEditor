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
   if (!vertices.length) return mst;

   const edges = graph.getEdges();

   const v1 = vertices[0];
   const e1 = getMinEdge(graph.getVEdges(v1));

   if (!e1) { 
      mst.addVertex(v1);
      return mst;
   }

   addEdge(e1, mst, vertices);

   while (vertices.length) { 
      const candidates = getCandidateEdges(edges, mst);
      const nextEdge = getMinEdge(candidates);
      addEdge(e1, mst, vertices);
   }

   return mst;
}

//Ребра, в которых только 1 вершина принадлежит mst
function getCandidateEdges<E, V>(edges: Edge<E, V>[], mst: Graph<E, V>): Edge<E, V>[] { 
   return edges.filter((e) => {
      return (mst.containsVertex(e.v1) !== mst.containsVertex(e.v2));
   });
}

function addEdge<E, V>(e1: Edge<E, V>, mst: Graph<E, V>, vertices: Vertex<V>[]) { 
   mst.addEdge(e1);

   //remove;
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

// - - -
export function _toMST<E, V>(graph: Graph<E, V>): Graph<E, V> {
   const mst = new Graph<E, V>();

   const vertices = graph.getVertices();
   if (!vertices) return mst;

   mst.addVertex(vertices[0]);
   step(vertices[0], vertices, graph, mst);

   return mst;
}

function step<E, V>(v: Vertex<V>, vs: Vertex<V>[], graph: Graph<E, V>, mst: Graph<E, V>) { 
   //Ребра, в которых только 1 вершина принадлежит mst
   const edges = graph.getVEdges(v).filter((e) => {
      return (mst.containsVertex(e.v1) !== mst.containsVertex(e.v2));
   });

   const minEdge = getMinEdge(edges);

   if (!minEdge) return;
   mst.addEdge(minEdge);

   step(minEdge.v1, vs, graph, mst);
   step(minEdge.v2, vs, graph, mst);
}