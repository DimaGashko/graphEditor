import toMST from "./modelComponents/graph/algorithms/toMST";
import Workspace from "./workspace/workspace";
import { graphDemo1, graphDemo2 } from "./mstDemo";

let graph = graphDemo2;
let mst = toMST(graph);

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