import getMST from "./modelComponents/graph/algorithms/getMST";
import Workspace from "./workspace/workspace";
import { graphDemo1, graphDemo2 } from "./mstDemo";
import Vector from "./modelComponents/vector";

let graph = graphDemo1;

const workspace = new Workspace(document.querySelector('.workspace'));
workspace.getData().wsGraph.graph = graph;
workspace.start();

workspace.addEvent('tik', () => {
   const mst = getMST(graph, (edge) => {
      return Vector.getSquareDistance(
         edge.v1.targ.coords, edge.v2.targ.coords
      ) * edge.getWeight();
   });

   graph.getEdges().forEach(e => e.targ.style.color = "rgba(0,0,0,.15)");
   mst.getEdges().forEach(e => e.targ.style.color = "#000");
});