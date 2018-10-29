import Graph from "../graph";
import Edge from "../edge";

//Интерфейс фукнций, что выбирает минимальное ребро
interface ISelectEdge {
   <E, V>(edges: Edge<E, V>[]): Edge<E, V> | null;
}

/**
 * Возвращает минимальное остовное дерево графа
 * 
 * Основан на алгоритме Ярника-Прима-Дейкстры
 * Получает связный неориентированный граф
 * 
 * @param graph Связный неориентированный граф
 * @param selectEdge функция выбора минимального ребра
 * (по умолчанию выберает ребро с наименьшим весом)
 * @returns минимальное остовное дерево графа
 */
export default function toMST<E, V>(
   graph: Graph<E, V>,
   selectEdge: ISelectEdge = selectMinEdge
): Graph<E, V> {
   const mst = new Graph<E, V>();

   const vertices = graph.getVertices();
   let vLen = vertices.length;

   if (vLen <= 1) { 
      mst.addAllVertices(vertices);
      return mst;
   }

   const edges = graph.getEdges();

   const v1 = vertices[0];
   const e1 = selectEdge(graph.getVEdges(v1));

   mst.addEdge(e1);
   vLen -= 2;

   while (vLen) { 
      const nextEdge = selectEdge(getCandidateEdges(edges, mst));
      if (!nextEdge) return mst;
      
      mst.addEdge(nextEdge);
      vLen -= 1;
   }

   return mst;
}

//Ребра, в которых только 1 вершина принадлежит mst
function getCandidateEdges<E, V>(edges: Edge<E, V>[], mst: Graph<E, V>): Edge<E, V>[] { 
   return edges.filter((e) => {
      return (mst.containsVertex(e.v1) !== mst.containsVertex(e.v2));
   });
}

function selectMinEdge<E, V>(edges: Edge<E, V>[]): Edge<E, V> | null {
   if (!edges.length) return null;
   
   let minEdge = edges[0];
   let minWeight = (<any>edges[0].targ).weight || 1;

   for (let i = 1; i < edges.length; i++) {
      const weight = (<any>edges[i].targ).weight || 1;

      if (weight < minWeight) {
         minWeight = weight;
         minEdge = edges[i];
      }
   }

   return minEdge;
};

// - - -
/*export function _toMST<E, V>(graph: Graph<E, V>): Graph<E, V> {
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
}*/