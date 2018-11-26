import { graphDemo1 } from "./mstDemo";
import Workspace from "../workspace/workspace";
import getMST from "../modelComponents/graph/algorithms/getMST";
import Vector from "../modelComponents/vector";
import traversalTree from "../modelComponents/graph/algorithms/traversalTree";
import Graph from "../modelComponents/graph/graph";
import Vertex from "../modelComponents/graph/vertex";
import Edge from "../modelComponents/graph/edge";

const global = <any>window;

export default function demoGetMST() { 
   let graph = graphDemo1;

   const workspace = new Workspace(document.querySelector('.workspace'));
   workspace.getData().wsGraph.graph = graph;
   workspace.start();

   workspace.addEvent('tik', () => {
      const mst = getMST(graph, getWeight);

      //graph.getEdges().forEach(e => e.targ.style.color = "rgba(0,0,0,.15)");
      //mst.getEdges().forEach(e => e.targ.style.color = "#000");

      global.mst = mst;
   });

   global.graph = graph;
   global.traversalTree = traversalTree;
   global.traversalGraph = traversalGraph;
}

function traversalGraph(graph: Graph<any, any>): Vertex<any>[] {
   const mst = getMST(graph, getWeight);
   return traversalTree(mst, graph.getVertex(0), 'pre');
}

function getWeight(edge: Edge<any, any>) {
   return Vector.getSquareDistance(
      edge.v1.targ.coords, edge.v2.targ.coords
   ) * edge.getWeight();
}