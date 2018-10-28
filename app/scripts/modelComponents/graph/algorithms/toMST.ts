import Graph from "../graph";

/**
 * Возвращает минимальное остовное дерево графа
 * Основан на алгоритме Ярника-Прима-Дейкстры
 * @param graph Связный неориентированный граф
 * @returns минимальное остовное дерево графа
 */
export default function toMST<E, V>(graph: Graph<E, V>): Graph<E, V> {
   return new Graph<E, V>();
}