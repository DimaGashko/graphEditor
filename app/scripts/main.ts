import GraphEditor from "./graph-editor";
import Graph from "./math/graph/graph";
import Vertex from "./math/graph/vertex";
import Edge from "./math/graph/edge";

let graph: Graph = new Graph();

let v0 = new Vertex(0);
let v1 = new Vertex(1);
let v2 = new Vertex(2);
let v3 = new Vertex(3);
let v4 = new Vertex(4);
let v5 = new Vertex(5);
let v6 = new Vertex(6);
let v7 = new Vertex(7);

let e1 = new Edge(v1, v1, 'bi', 3);
let e2 = new Edge(v2, v2, 'bi', 3);
let e3 = new Edge(v4, v4, 'bi', 3);
let e4 = new Edge(v5, v5, 'bi', 3);

let e5 = new Edge(v1, v4, 'bi', 1);
let e6 = new Edge(v2, v5, 'bi', 1);

let e7 = new Edge(v4, v5, 'uni', 5);
let e8 = new Edge(v1, v2, 'uni', 5);

let e9 = new Edge(v1, v3, 'uni', 1);
let e10 = new Edge(v2, v3, 'uni', 1);
let e11 = new Edge(v4, v3, 'uni', 1);
let e12 = new Edge(v5, v3, 'uni', 1);

let e13 = new Edge(v0, v6, 'uni', 2);
let e14 = new Edge(v6, v0, 'uni', 2);

let e15 = new Edge(v6, v0, 'bi', 1);
let e16 = new Edge(v7, v7, 'bi', 1);
let e17 = new Edge(v7, v7, 'bi', 2);
let e18 = new Edge(v7, v7, 'bi', 3);

graph.addVertex(v0);
graph.addVertex(v1);
graph.addVertex(v2);
graph.addVertex(v3);
graph.addVertex(v4);
graph.addVertex(v5);
graph.addVertex(v6);
graph.addVertex(v7);

graph.addEdge(e1);
graph.addEdge(e2);
graph.addEdge(e3);
graph.addEdge(e3);
graph.addEdge(e4);
graph.addEdge(e5);
graph.addEdge(e6);
graph.addEdge(e7);
graph.addEdge(e8);
graph.addEdge(e9);
graph.addEdge(e10);
graph.addEdge(e11);
graph.addEdge(e12);
graph.addEdge(e13);
graph.addEdge(e14);
graph.addEdge(e15);
graph.addEdge(e16);
graph.addEdge(e17);
graph.addEdge(e18);

(<any>window).g = graph;

(function () {
   console.time('GraphEditor');

   let root: Element|null = document.querySelector('.graph_editor');
   if (!root) {
      console.log('Не удалось получить элемент .graph_editor');
      alert('Error. Cannot create the Graph Editor');
      return;
   }
   
   let graphEditor = new GraphEditor(root);

   graphEditor.projectManager.createNewProject();
   graphEditor.projectManager.createNewProject();

   console.timeEnd('GraphEditor');

   (<any>window).ge = graphEditor;
}());