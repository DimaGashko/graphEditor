import Vertex from "./modelComponents/graph/vertex";
import Edge from "./modelComponents/graph/edge";
import Graph from "./modelComponents/graph/graph";

let vs = [
   new Vertex<Number>(1),
   new Vertex<Number>(2),
   new Vertex<Number>(3),
   new Vertex<Number>(4),
   new Vertex<Number>(5),
   new Vertex<Number>(6),
];

let es = [
   new Edge<Number, Number>(vs[0], vs[1], 1, 'bi'),
   new Edge<Number, Number>(vs[1], vs[2], 2, 'bi'),
   new Edge<Number, Number>(vs[2], vs[3], 3, 'bi'),
   new Edge<Number, Number>(vs[4], vs[5], 4, 'bi'),
   new Edge<Number, Number>(vs[5], vs[6], 5, 'bi'),
]

let graph = new Graph(vs, es);

(<any>window).g = graph;