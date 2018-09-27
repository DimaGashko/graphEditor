import GraphEditor from "./graph-editor";
import KEYS from "./keys";
import FPS from "./helpers/fps";

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

   setInterval(() => { 
      console.log(FPS.get());
   }, 1000);

   (<any>window).ge = graphEditor;
}());   