import Vertex from "../vertex";
import Graph from "../graph";
import Vector from "../../vector";
import WSEdge from "../../../workspace/ws_graph/ws_edge";
import WSVertex from "../../../workspace/ws_graph/ws_vertex";
import Edge from "../edge";

let start: Vector = null;
let step: Vector = null;

let tree: Graph<any, any> = null;
let positioned: Graph<WSEdge, WSVertex>;

export function positionedTree(
   _tree: Graph<any, any>,
   root: Vertex<any>,
   _start = new Vector(0, -250),
   _step = new Vector(30, 80)
): Graph<WSEdge, WSVertex> {

   start = _start;
   step = _step;

   positioned = new Graph<WSEdge, WSVertex>();
   tree = _tree;

   positioned.addVertex(getNextVertex(root, start));
   return positioned;
}   
   
function getNextVertex(vertex: Vertex<any>, coords: Vector): Vertex<WSVertex> { 
   const root = new Vertex(new WSVertex(vertex.targ.toString(), coords));
   
   const nexts = tree.getVVertices(vertex);
   if (!nexts.length) return root;

   const v1 = getNextVertex(nexts[0], getCoords(nexts[0], coords, -1));
   const v2 = getNextVertex(nexts[1], getCoords(nexts[1], coords, 1));

   positioned.addEdge(new Edge(root, v1, new WSEdge()));
   positioned.addEdge(new Edge(root, v2, new WSEdge()));

   return root;
}

function getCoords(root: Vertex<any>, base: Vector, dir: 1 | -1): Vector { 
   const height = getMaxHeight(root, tree) - 1;
   
   return new Vector(
      base.x + (1 << height) * step.x * dir,
      base.y + step.y
   );
}

function getMaxHeight(root: Vertex<any>, tree: Graph<any, any>): number {
   const nexts = tree.getVVertices(root);
   if (!nexts.length) return 1;

   return 1 + Math.max(
      getMaxHeight(nexts[0], tree),
      getMaxHeight(nexts[1], tree)
   );

}