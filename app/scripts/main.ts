import GraphEditor from "./graph-editor";
import Graph from "./math/graph/graph";
import Vertex from "./math/graph/vertex";
import Edge from "./math/graph/edge";

let graph: Graph = new Graph();

let v1 = new Vertex(1);
let v2 = new Vertex(2);
let v3 = new Vertex(3);
let v4 = new Vertex(4);

let e1 = new Edge(v1, v2);
let e2 = new Edge(v1, v3);

graph.addEdge(e1);
graph.addEdge(e2);

graph.addVertex(v4);

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