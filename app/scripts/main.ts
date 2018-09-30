import GraphEditor from "./graph-editor";
import { createRandomAdjacencyMatrix } from "./math/math";
import Graph from "./math/graph/graph";
import graphDemo1 from "./configs/exapmples/demo1";
import { multipleTest } from "./configs/exapmples/mulptiple_test";

(function () {
   console.time('GraphEditor'); 

   let root: Element | null = document.querySelector('.graph_editor');
   if (!root) {
      console.log('Не удалось получить элемент .graph_editor');
      alert('Error. Cannot create the Graph Editor');
      return;
   }
   
   let editor = new GraphEditor(root); 
   let projectManager = editor.projectManager;

   let project1 = projectManager.createNewProject('Случайный');
   let project2 = projectManager.createNewProject('Кратные ребра');
   let project3 = projectManager.createNewProject('Мартица смежности');
   let project4 = projectManager.createNewProject('Матрица инцедентности');
   let project5 = projectManager.createNewProject('Demo Graph');

   project5.getWorkspace().getData().wsGraph.createByGraph(graphDemo1);

   project4.getWorkspace().getData().wsGraph.createByGraph(
      Graph.parseIncidenceMatrix([
         [1, 1, 0, 0, 0, 0],
         [1, 1, 0, 0, 0, 0],
         [1, 1, 0, 0, 0, 0],
         [1, 1, 0, 0, 0, 0],
         [0, 1, 1, 0, 0, 0],
         
         [0, 0, 0, 1, 1, 0],
         [0, 0, 0, 0, 1, 1],
         [0, 0, 0, 0, 1, 1],
         [0, 0, 0, 0, 1, 1],
         [0, 0, 0, 0, 1, 1],
      ])
   );

   project3.getWorkspace().getData().wsGraph.createByGraph(
      Graph.parseAdjacencyMatrix([
         [0, 5, 0, 1, 0],  
         [5, 0, 0, 0, 0],
         [1, 1, 0, 1, 1],
         [0, 1, 0, 1, 0],
         [0, 0, 1, 0, 0],
      ])
   );

   project1.getWorkspace().getData().wsGraph.createByGraph(
      Graph.parseAdjacencyMatrix(createRandomAdjacencyMatrix())
   );

   project2.getWorkspace().getData().wsGraph.createByGraph(
      Graph.parseIncidenceMatrix(multipleTest)
   );

   for (let i = 0; i <= -1; i++) { 
      let project = projectManager.createNewProject(`Случайный ${i + 1}`);
      project.getWorkspace().getData().wsGraph.createByGraph(
         Graph.parseAdjacencyMatrix(createRandomAdjacencyMatrix())
      );
   }

   console.timeEnd('GraphEditor');
   (<any>window).ge = editor;
}());   