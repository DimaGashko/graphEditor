import Graph from "../graph";

export default function parseIncidenceMatrix<E, V>(matrix: number[][]): Graph<E, V> {
   return new Graph<E, V>();
}