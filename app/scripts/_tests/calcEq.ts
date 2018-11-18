import Expression, { ExpNode } from "../modelComponents/Expression";
import Workspace from "../workspace/workspace";
import Graph from "../modelComponents/graph/graph";
import WSEdge from "../workspace/ws_graph/ws_edge";
import WSVertex from "../workspace/ws_graph/ws_vertex";

const global = (<any>window);

const workspace = new Workspace(document.querySelector('.workspace'));

export default function demoCalcEq() {
   global.Expression = Expression;

   global.setExp = ((exp: Expression) => { 
      setExp(exp);
      global.exp = exp;
   });
}

function setExp(exp: Expression) { 
   workspace.getData().wsGraph.graph = buildEpxGraph(exp.tree);
}

function buildEpxGraph(expTree: Graph<null, ExpNode>): Graph<WSEdge, WSVertex> { 
   return new Graph<WSEdge, WSVertex>();
}