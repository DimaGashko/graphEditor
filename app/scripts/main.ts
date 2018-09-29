import GraphEditor from "./graph-editor";
import { getRandomInt } from "./math/geometry/geometry";
import Graph from "./math/graph/graph";

(function () {
   console.time('GraphEditor');

   let root: Element|null = document.querySelector('.graph_editor');
   if (!root) {
      console.log('Не удалось получить элемент .graph_editor');
      alert('Error. Cannot create the Graph Editor');
      return;
   }
   
   let graphEditor = new GraphEditor(root); 

   let project1 = graphEditor.projectManager.createNewProject();
   let project2 = graphEditor.projectManager.createNewProject();
   let project3 = graphEditor.projectManager.createNewProject();

   project1.rename('Demo Graph');
   project2.rename('Из матрицы смежности');
   project3.rename('Случайный граф');

   project1.getWorkspace().getData().wsGraph.createDemo();

   project2.getWorkspace().getData().wsGraph.createByAdjacencyMatrix([
      [0, 5, 0, 1, 0],  
      [5, 0, 0, 0, 0],
      [1, 1, 0, 1, 1],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0],
   ]);

   console.log(project2.getWorkspace().getData().wsGraph.graph.toIncidenceMatrix())

   project3.getWorkspace().getData().wsGraph.createByAdjacencyMatrix(
      createRandomAdjacencyMatrix()
   );

   function createRandomAdjacencyMatrix(): number[][] { 
      let matrix: number[][] = [];
      let len = getRandomInt(2, 10);

      for (let i = 0; i < len; i++) { 
         matrix[i] = [];

         for (let j = 0; j < len; j++) { 
            matrix[i][j] = (Math.random() > 0.8) ? 1 : 0;
         }
      }
      
      return matrix;
   }

   console.timeEnd('GraphEditor');

   (<any>window).ge = graphEditor;
}());   


console.log(Graph.parseIncidenceMatrix([
   [-1, 0, 0, 1, 0],
   [1, 1, 0, 0, 0],
   [1, 0, -1, 0, 0],
   [0, 1, -1, 0, 0],
   [0, 0, -1, 1, 0],
   [0, 1, 0, -1, 0],
   [0, 0, 0, 2, 0],
   [0, 0, 1, 0, 1],
]).toAdjacencyMatrix());