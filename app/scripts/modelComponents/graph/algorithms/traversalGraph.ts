import Vertex from "../vertex";
import Graph from "../graph";
import getMST from "./getMST";
import traversalTree from "./traversalTree";

export default function traversalGraph<V=Object>(graph: Graph<null, Object>): Vertex<V>[] {
   const mst = getMST(graph);
   return traversalTree<V>(mst, graph.getVertex(0), 'pre');
}

