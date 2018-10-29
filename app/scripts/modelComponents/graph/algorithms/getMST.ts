import Graph from "../graph";
import Edge from "../edge";

/**
 * Возвращает минимальное остовное дерево графа
 * 
 * Основан на алгоритме Ярника-Прима-Дейкстры
 * Получает связный неориентированный граф
 * 
 * @param graph Связный неориентированный граф
 * @param selectEdge функция выбора минимального ребра
 * (по умолчанию выберает ребро с наименьшим весом)
 * 
 * @returns минимальное остовное дерево графа
 */
export default function getMST<E, V>(
   graph: Graph<E, V>,
   getWeight?: (edge: Edge<E, V>) => number
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
   const e1 = selectEdge(graph.getVEdges(v1), getWeight);

   mst.addEdge(e1);
   vLen -= 2;

   while (vLen) { 
      const nextEdge = selectEdge(getCandidateEdges(edges, mst), getWeight);
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

function selectEdge<E, V>(edges: Edge<E, V>[], getWeight: any = defGetWeight): Edge<E, V> | null {
   if (!edges.length) return null;
   
   let minEdge = edges[0];
   let minWeight = getWeight(minEdge);

   for (let i = 1; i < edges.length; i++) {
      const weight = getWeight(edges[i]);

      if (weight < minWeight) {
         minWeight = weight;
         minEdge = edges[i];
      }
   }

   return minEdge;
};

//Дефолтное определение веса ребер
function defGetWeight <E, V>(edge: Edge<E, V>): number {
   return edge.getWeight();
};