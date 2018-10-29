import getMST from "./modelComponents/graph/algorithms/getMST";
import Workspace from "./workspace/workspace";
import { graphDemo1, graphDemo2 } from "./mstDemo";

let graph = graphDemo1;

const workspace = new Workspace(document.querySelector('.workspace'));
workspace.getData().wsGraph.graph = graph;
workspace.start();

workspace.addEvent('tik', () => {
   const mst = getMST(graph, (edge) => { 
      const xy1 = edge.v1.targ.coords;
      const xy2 = edge.v2.targ.coords;
   
      const a = xy1.x - xy2.x;
      const b = xy1.y - xy2.y;
   
      return a * a + b * b;
   });

   graph.getEdges().forEach(edge => {
      edge.targ.style.lineColor = "rgba(0,0,0,.15)";
      edge.targ.style.color = "rgba(0,0,0,.15)";
   });

   mst.getEdges().forEach(edge => {
      edge.targ.style.lineColor = "#000";
      edge.targ.style.color = "#000";
   });
});