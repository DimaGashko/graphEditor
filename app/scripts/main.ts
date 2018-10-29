import getMST from "./modelComponents/graph/algorithms/getMST";
import Workspace from "./workspace/workspace";
import { graphDemo1, graphDemo2 } from "./mstDemo";

let graph = graphDemo1;

let mst = getMST(graph, (edge) => { 
   const xy1 = edge.v1.targ.coords;
   const xy2 = edge.v2.targ.coords;

   const a = xy1.x - xy2.x;
   const b = xy1.y - xy2.y;

   return Math.random();
   return a * a + b * b;
});

const workspace = new Workspace(document.querySelector('.workspace'));
workspace.getData().wsGraph.graph = graph;
workspace.start();

//Test CLI
const global = <any>window;
global.graph = graph;
global.mst = mst;

global.toMST = (() => {
   graph.getEdges().filter(e => !mst.containsEdge(e)).forEach(edge => {
      edge.targ.style.lineColor = "rgba(0,0,0,.1)";
      edge.targ.style.color = "rgba(0,0,0,.1)";
   });
});