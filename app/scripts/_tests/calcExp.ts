import Expression, { NodeExp } from "../modelComponents/Expression";
import Workspace from "../workspace/workspace";
import Graph from "../modelComponents/graph/graph";
import WSEdge from "../workspace/ws_graph/ws_edge";
import WSVertex from "../workspace/ws_graph/ws_vertex";
import Vector from "../modelComponents/vector";
import Vertex from "../modelComponents/graph/vertex";
import Edge from "../modelComponents/graph/edge";

const global = (<any>window);

const workspace = new Workspace(document.querySelector('.workspace'));
workspace.start();

export default function demoCalcExp() {
   //global.exp = setExp(new Expression("((28.3-32)*2)+(((8*9)/(9*(3+6)))/((28-32)/((2+6)*8)))"));
   
   global.exp = setExp(new Expression("2+2"));
   global.Expression = Expression;
   
   global.setExp = ((exp: Expression) => { 
      return global.exp = setExp(exp);
   });
}

function setExp(exp: Expression): Expression { 
   workspace.getData().wsGraph.graph = buildEpxGraph(exp);
   return exp;
}

const buildEpxGraph = (function () {
   const start = new Vector(0, -250);
   const step = new Vector(30, 80);

   let tree: Graph<null, NodeExp> = null;
   let builtGraph: Graph<WSEdge, WSVertex>;
   
   return function buildEpxGraph(exp: Expression): Graph<WSEdge, WSVertex> {
      builtGraph = new Graph<WSEdge, WSVertex>();
      tree = exp.tree;

      builtGraph.addVertex(getNextVertex(exp.root, start));
      return builtGraph;
   }
   
   function getNextVertex(vertex: Vertex<NodeExp>, coords: Vector): Vertex<WSVertex> { 
      const root = new Vertex(new WSVertex(vertex.targ.toString(), coords));
      
      const nexts = tree.getVVertices(vertex);
      if (!nexts.length) return root;

      const v1 = getNextVertex(nexts[0], getCoords(nexts[0], coords, -1));
      const v2 = getNextVertex(nexts[1], getCoords(nexts[1], coords, 1));

      builtGraph.addEdge(new Edge(root, v1, new WSEdge()));
      builtGraph.addEdge(new Edge(root, v2, new WSEdge()));

      return root;
   }

   function getCoords(root: Vertex<NodeExp>, base: Vector, dir: 1 | -1): Vector { 
      const height = getMaxHeight(root, tree) - 1;
      
      return new Vector(
         base.x + (1 << height) * step.x * dir,
         base.y + step.y
      );
   }

}());

function getMaxHeight(root: Vertex<any>, tree: Graph<any, any>): number {
   const nexts = tree.getVVertices(root);
   if (!nexts.length) return 1;

   return 1 + Math.max(
      getMaxHeight(nexts[0], tree),
      getMaxHeight(nexts[1], tree)
   );

}

