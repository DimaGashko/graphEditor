import Vertex from "../vertex";
import Graph from "../graph";

export default function traversalTree<V>(
   tree: Graph<null, V>,
   root: Vertex<V>
): Vertex<V>[] { 

   return [new Vertex<V>(null)];

}