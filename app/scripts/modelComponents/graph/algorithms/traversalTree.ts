import Vertex from "../vertex";
import Graph from "../graph";

let verticesResult: Vertex<Object>[];
let tree: Graph<null, Object>;
let type: 'pre' | 'in' | 'post'; 

export default function traversalTree<V=Object>(
   _tree: Graph<null, Object>,
   root: Vertex<Object>,
   _type: 'pre' | 'in' | 'post'
): Vertex<V>[] {
   
   verticesResult = [];
   tree = _tree;
   type = _type;

   addNext(root);
   return <Vertex<V>[]>verticesResult;
}

function addNext(root: Vertex<Object>): Vertex<Object> {
   const nexts = tree.getVVertices(root);
   if (!nexts.length) return root; 

   verticesResult.push(root, addNext(nexts[0]), addNext(nexts[1]));
   return root;
}

