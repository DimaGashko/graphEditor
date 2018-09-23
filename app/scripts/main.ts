import GraphEditor from "./graph-editor";

(function () { 

   let root: HTMLElement|null = document.querySelector('.graph_editor');
   if (!root) {
      console.log('Не удалось получить элемент .graph_editor');
      alert('Error. Cannot create the Graph Editor');
      return;
   }
   
   let graphEditor = new GraphEditor(root);
   graphEditor.projectManager.createNewProject();
   graphEditor.projectManager.createNewProject();
   graphEditor.projectManager.createNewProject();
   graphEditor.projectManager.createNewProject("ASDFASDFasf safdfaaad fasdjfkl asdjfk;sd adsk jasdfk; jsdfkljs d;fkjsd f;klsdf");
   graphEditor.projectManager.createNewProject();
   graphEditor.projectManager.createNewProject();

}());