import Component from "../../framework/component";
import WSData from "./ws_data";
import WSConverter from "./ws_converter";

export default class WSEvents extends Component {

   constructor(private data: WSData, private converter: WSConverter) { 
      super();
   }

}