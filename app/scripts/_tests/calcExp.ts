import Expression, { NodeExp } from "../modelComponents/Expression";
import Workspace from "../workspace/workspace";
import Graph from "../modelComponents/graph/graph";
import WSEdge from "../workspace/ws_graph/ws_edge";
import WSVertex from "../workspace/ws_graph/ws_vertex";
import Vector from "../modelComponents/vector";
import Vertex from "../modelComponents/graph/vertex";

const global = (<any>window);

const workspace = new Workspace(document.querySelector('.workspace'));

export default function demoCalcExp() {
   global.Expression = Expression;

   global.setExp = ((exp: Expression) => { 
      setExp(exp);
      global.exp = exp;
   });
}

function setExp(exp: Expression) { 
   workspace.getData().wsGraph.graph = buildEpxGraph(exp);
}

const buildEpxGraph = (function () {
   const start = new Vector(0, -300);
   const step = new Vector(80, 80);

   let tree: Graph<null, NodeExp> = null;
   let builtGraph: Graph<WSEdge, WSVertex>;

   return function buildEpxGraph(exp: Expression): Graph<WSEdge, WSVertex> {
      const root = exp.root;

      builtGraph = new Graph<WSEdge, WSVertex>();
      tree = exp.tree;

      addNextVertex(root, start);
      return builtGraph;
   }

   function addNextVertex(vertex: Vertex<NodeExp>, coords: Vector) { 
      const root = new Vertex(new WSVertex(vertex.targ.toString(), coords));
      builtGraph.addVertex(root);
      
      tree.getVEdges(vertex).forEach((edge, i) => {
         const next = (edge.v1 === vertex) ? edge.v2 : edge.v1;

         const nextCoords = new Vector(
            (i == 0) ? -coords.x : coords.x,
            coords.y
         );

         addNextVertex(next, nextCoords);
      });

   }

}());