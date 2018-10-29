import Graph from "./modelComponents/graph/graph";
import Edge from "./modelComponents/graph/edge";
import WSEdge from "./workspace/ws_graph/ws_edge";
import Vector from "./modelComponents/vector";
import WSVertex from "./workspace/ws_graph/ws_vertex";
import Vertex from "./modelComponents/graph/vertex";

export const graphDemo2 = (function () { 
   const vs = [
      new Vertex(new WSVertex(new Vector(-200, 0), "v0")),
      new Vertex(new WSVertex(new Vector(150, -150), "v1")),
      new Vertex(new WSVertex(new Vector(200, 0), "v2")),
      new Vertex(new WSVertex(new Vector(-50, 100), "v3")),
   ];
   
   const es = [
      new Edge(vs[0], vs[1], new WSEdge("e0", 2)),
      new Edge(vs[1], vs[2], new WSEdge("e1", 2)),
      new Edge(vs[2], vs[3], new WSEdge("e2")),
      new Edge(vs[3], vs[0], new WSEdge("e3")),
      new Edge(vs[3], vs[1], new WSEdge("e4")),
      new Edge(vs[0], vs[2], new WSEdge("e5", 2)),
   ];

   return new Graph(vs, es);
}());

export const graphDemo1 = (function () { 
   const vs = [
      new Vertex(new WSVertex(new Vector(-200, -200), "v0")),
      new Vertex(new WSVertex(new Vector(150, -150), "v1")),
      new Vertex(new WSVertex(new Vector(200, 0), "v2")),
      new Vertex(new WSVertex(new Vector(100, 150), "v3")),
      new Vertex(new WSVertex(new Vector(-150, 150), "v4")),
   ];
   
   const es = [
      new Edge(vs[0], vs[1], new WSEdge("e0")),
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

   return new Graph(vs, es);
}());