import Vertex from "./modelComponents/graph/vertex";
import Edge from "./modelComponents/graph/edge";

let vs = [
   new Vertex<Number>(1),
   new Vertex<Number>(2),
   new Vertex<Number>(3),
   new Vertex<Number>(4),
   new Vertex<Number>(5),
   new Vertex<Number>(6),
];

let es = [
   new Edge<Number, Number>(vs[0], vs[1], 0, 'bi'),
]