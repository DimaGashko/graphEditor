import Graph from "../../math/graph/graph";
import Vertex from "../../math/graph/vertex";
import WSVertex from "../../project-manager/workspace/ws_graph/ws_vertex";
import Vector from "../../math/vector/vector";
import Edge from "../../math/graph/edge";
import WSEdge from "../../project-manager/workspace/ws_graph/ws_edge";

let graph = new Graph;
let graphDemo1 = graph;

let v1 = new Vertex(new WSVertex(new Vector(-200, 100), 'v1'));
let v2 = new Vertex(new WSVertex(new Vector(0, 100), 'v2'));
let v3 = new Vertex(new WSVertex(new Vector(130, -70), 'v3'));
let v4 = new Vertex(new WSVertex(new Vector(150, 200), 'v4'));

graph.addEdge(new Edge(v2, v1, 'uni', new WSEdge('e1', 1)));
graph.addEdge(new Edge(v2, v3, 'uni', new WSEdge('e2', 1)));
graph.addEdge(new Edge(v1, v3, 'bi', new WSEdge('e3', 2)));
graph.addEdge(new Edge(v2, v4, 'uni', new WSEdge('e4', 1)));
graph.addEdge(new Edge(v3, v4, 'bi', new WSEdge('e5', 1)));
graph.addEdge(new Edge(v3, v3, 'uni', new WSEdge('e6', 1)));
graph.addEdge(new Edge(v3, v3, 'bi', new WSEdge('e7', 3)));
graph.addEdge(new Edge(v3, v3, 'uni', new WSEdge('e8', 3)));
graph.addEdge(new Edge(v1, v3, 'uni', new WSEdge('e9', 1)));
graph.addEdge(new Edge(v4, v3, 'uni', new WSEdge('e10', 1)));
graph.addEdge(new Edge(v3, v4, 'uni', new WSEdge('e11', 1)));

export default graphDemo1