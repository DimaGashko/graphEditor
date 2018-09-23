import Component from "./framework/component";
import ProjectManager from "./project-manager/project-manager";

export default class GraphEditor extends Component {
   private projectManager = new ProjectManager();

   constructor() { 
      super();
      this.init();
   }

   private init(): void { 
      console.log(this)
   }

}