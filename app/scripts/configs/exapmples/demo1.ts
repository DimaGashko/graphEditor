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

graph.addEdge(new Edge(v2, v1, 'uni', 1, new WSEdge('e1')));
graph.addEdge(new Edge(v2, v3, 'uni', 1, new WSEdge('e2')));
graph.addEdge(new Edge(v1, v3, 'bi', 2, new WSEdge('e3')));
graph.addEdge(new Edge(v2, v4, 'uni', 1, new WSEdge('e4')));
graph.addEdge(new Edge(v3, v4, 'bi', 1, new WSEdge('e5')));
graph.addEdge(new Edge(v3, v3, 'uni', 1, new WSEdge('e6')));
graph.addEdge(new Edge(v3, v3, 'bi', 3, new WSEdge('e7')));
graph.addEdge(new Edge(v3, v3, 'uni', 3, new WSEdge('e8')));
graph.addEdge(new Edge(v1, v3, 'uni', 1, new WSEdge('e9')));
graph.addEdge(new Edge(v4, v3, 'uni', 1, new WSEdge('e10')));
graph.addEdge(new Edge(v3, v4, 'uni', 1, new WSEdge('e11')));

export default graphDemo1