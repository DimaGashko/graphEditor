import Vertex from "../vertex";
import Graph from "../graph";

let tree: Graph<null, Object>;
let type: 'pre' | 'in' | 'post'; 

export default function traversalTree<V=Object>(
   _tree: Graph<null, Object>,
   root: Vertex<Object>,
   _type: 'pre' | 'in' | 'post'
): Vertex<V>[] {
   
   tree = _tree;
   type = _type;

   return <Vertex<V>[]>addNext(root);
}

function addNext(root: Vertex<Object>): Vertex<Object>[] {
   const nexts = tree.getVVertices(root);
   if (!nexts.length) return [root]; 

   const nextsRes = nexts.map(next => addNext(next));

   if (type === 'pre') {
      return [].concat(root, ...nextsRes);
   
   } else if (type === 'in') {
      return [].concat(nextsRes[0], root, ...nextsRes.slice(1));

   } else if (type === 'post') { 
      return [].concat(...nextsRes, root);

   }
   
}

