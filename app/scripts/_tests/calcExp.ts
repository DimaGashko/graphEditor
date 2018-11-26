import Expression, { NodeExp } from "../modelComponents/Expression";
import Workspace from "../workspace/workspace";
import { positionedTree } from "../modelComponents/graph/algorithms/positionedTree";

const global = (<any>window);

const workspace = new Workspace(document.querySelector('.workspace'));
workspace.start();

export default function demoCalcExp() {
   global.exp = setExp(new Expression("2.2+4*7+6.3*4/7/4%(5&6|7^8)"));
   global.Expression = Expression;
   
   global.setExp = ((exp: Expression) => { 
      return global.exp = setExp(exp);
   });
}

function setExp(exp: Expression): Expression { 
   workspace.getData().wsGraph.graph = positionedTree(exp.tree, exp.root);
   return exp;
}


