import Expression, { NodeExp } from "../modelComponents/Expression";
import Workspace from "../workspace/workspace";
import { positionedTree } from "../modelComponents/graph/algorithms/positionedTree";
import Graph from "../modelComponents/graph/graph";
import Vertex from "../modelComponents/graph/vertex";
import traversalTree from "../modelComponents/graph/algorithms/traversalTree";

const global = <any>window;

const workspace = new Workspace(document.querySelector('.workspace'));
workspace.start();

export default function demoCalcExp() {
   let exp = new Expression("2.2+4*7+6.3*4/7/4%(5&6|7^8)")
   exp = new Expression("2+3*4+5");
   global.exp = setExp(exp);
   global.Expression = Expression;
   
   global.setExp = ((exp: Expression) => { 
      return global.exp = setExp(exp);
   });

   global.preorder = (() => traversal(exp, 'pre'));
   global.inorder = (() => traversal(exp, 'in'));
   global.postorder = (() => traversal(exp, 'post'));

   global.inorderPrecedence = (() => inorderPrecedence(exp));
}

function setExp(exp: Expression): Expression { 
   workspace.getData().wsGraph.graph = positionedTree(exp.tree, exp.root);
   return exp;
}

function traversal(exp: Expression, type: 'pre' | 'in' | 'post'): string {
   return traversalTree(exp.tree, exp.root, type).map(v => v.targ).join('');
}

const inorderPrecedence = (function () { 
   let tree: Graph<null, Object>;

   return function inorder(exp: Expression): string {
      tree = exp.tree;
      return getNext(exp.root);
   }

   function getNext(root: Vertex<Object>): string { 
      const nexts = tree.getVVertices(root);
      if (!nexts.length) return root.targ.toString();
      
      return `(${getNext(nexts[0])}${root.targ.toString()}${getNext(nexts[1])})`;
   }
}());

