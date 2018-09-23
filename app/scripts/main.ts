import GraphEditor from "./graph-editor";

(function () { 

   let root: HTMLElement|null = document.querySelector('.graph_editor');
   if (!root) {
      console.log('Не удалось получить элемент .graph_editor');
      alert('Error. Cannot create the Graph Editor');
      return;
   }
   
   let graphEditor = new GraphEditor(root);

   (<any>window).g = graphEditor;

}());