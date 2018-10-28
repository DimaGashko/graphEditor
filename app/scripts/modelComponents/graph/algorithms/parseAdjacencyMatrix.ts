import Graph from "../graph";

export default function parseAdjacencyMatrix<E, V>(matrix: number[][]): Graph<E, V> {
   return new Graph<E, V>();
}