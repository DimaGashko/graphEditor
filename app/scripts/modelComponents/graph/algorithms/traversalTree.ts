import Vertex from "../vertex";
import Graph from "../graph";

let tree: Graph<null, Object>;
let type: 'pre' | 'in' | 'post'; 

/**
 * Возвращает массив вершин дерева образованный при его обходе
 * (дерево может быть любым)
 * 
 * @param _tree Обрабатываемое дерево
 * @param root Корень дерева
 * @param _type Тип обхода: 'pre' - прямой, 'in' - внутренний, 'post' - обратный
 */
export default function traversalTree<V=Object>(
   _tree: Graph<null, Object>,
   root: Vertex<Object>,
   _type: 'pre' | 'in' | 'post'
): Vertex<V>[] {
   
   tree = _tree;
   type = _type;

   return <Vertex<V>[]>addNext(root);
}

function addNext(root: Vertex<Object>, prev?: Vertex<Object>): Vertex<Object>[] {
   const nexts = tree.getVVertices(root);
   if (!nexts.length) return [root];

   const nextsRes = nexts.filter(v => v !== prev)
      .map(next => addNext(next, root));

   if (!nextsRes.length) return [root];
   
   if (type === 'pre') {
      return [].concat(root, ...nextsRes);
   
   } else if (type === 'in') {
      const res = [].concat(nextsRes[0], root);
      const last = nextsRes.slice(1);
      
      return (last.length) ? res.concat(...last) : res;

   } else if (type === 'post') { 
      return [].concat(...nextsRes, root);

   }
   
}

