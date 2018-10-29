import Vertex from "./modelComponents/graph/vertex";
import Edge from "./modelComponents/graph/edge";
import Graph from "./modelComponents/graph/graph";
import toMST from "./modelComponents/graph/algorithms/toMST";
import Workspace from "./workspace/workspace";
import WSVertex from "./workspace/ws_graph/ws_vertex";
import Vector from "./modelComponents/vector";
import WSEdge from "./workspace/ws_graph/ws_edge";

let vs = [
   new Vertex(new WSVertex(new Vector(0, 0), "v0")),
   new Vertex(new WSVertex(new Vector(100, 100), "v1")),
   new Vertex(new WSVertex(new Vector(120, 200), "v2")),
   new Vertex(new WSVertex(new Vector(-40, -200), "v3")),
   new Vertex(new WSVertex(new Vector(-250, 100), "v4")),
];

let es = [
   new Edge(vs[0], vs[1], new WSEdge("e0", 5)),
   new Edge(vs[1], vs[2], new WSEdge("e1")),
   new Edge(vs[2], vs[3], new WSEdge("e2")),
   new Edge(vs[3], vs[4], new WSEdge("e3")),
   new Edge(vs[4], vs[0], new WSEdge("e4")),
   new Edge(vs[4], vs[1], new WSEdge("e5")),
   new Edge(vs[4], vs[2], new WSEdge("e6")),
   new Edge(vs[3], vs[0], new WSEdge("e7")),
   new Edge(vs[3], vs[1], new WSEdge("e8")),
   new Edge(vs[2], vs[0], new WSEdge("e9")),
];

const ws = new Workspace();
ws.init(document.querySelector('.workspace'));
ws.start();

let graph = new Graph(vs, es);
let mst = toMST(graph);

ws.getData().wsGraph.graph = graph;

const global = <any>window;
global.graph = graph;
global.mst = mst;

global.toMST = (() => { 
   ws.getData().wsGraph.graph = mst;
})