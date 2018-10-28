import Vertex from "./modelComponents/graph/vertex";
import Edge from "./modelComponents/graph/edge";
import Graph from "./modelComponents/graph/graph";
import toMST from "./modelComponents/graph/algorithms/toMST";

let vs = [
   new Vertex<Number>(0),
   new Vertex<Number>(1),
   new Vertex<Number>(2),
   new Vertex<Number>(3),
   new Vertex<Number>(4),
];

let es = [
   new Edge<Number, Number>(vs[0], vs[1], 0),
   new Edge<Number, Number>(vs[1], vs[2], 1),
   new Edge<Number, Number>(vs[2], vs[3], 2),
   new Edge<Number, Number>(vs[3], vs[4], 3),
   new Edge<Number, Number>(vs[4], vs[0], 4),
   new Edge<Number, Number>(vs[4], vs[1], 5),
   new Edge<Number, Number>(vs[4], vs[2], 6),
   new Edge<Number, Number>(vs[3], vs[0], 7),
   new Edge<Number, Number>(vs[3], vs[1], 8),
   new Edge<Number, Number>(vs[2], vs[0], 9),
]

let graph = new Graph(vs, es);
let mst = toMST(graph);

const global = <any>window;
global.graph = graph;
global.mst = mst;