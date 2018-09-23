import Component from "../../framework/component";
import WSData from "./ws_data";
import WSCamera from "./ws_camera";


export default class WSRender extends Component {
   private ctx: CanvasRenderingContext2D | null = null;

   private metrix: any = {}; 
   
   constructor(private data: WSData, private camera: WSCamera) { 
      super();
   }

   public init(canvas: HTMLCanvasElement, root: Element) { 
      this.els.canvas = canvas;
      this.ctx = canvas.getContext('2d');

      this.els.root = root;
   }

   public render(): void {
      
   }

   public updateMetrix(): void { 
      this.metrix.gameW = this.els.root.clientWidth;
      this.metrix.gameH = this.els.root.clientHeight;
   }

   public updateSize(): void {
      this.els.canvas.width = this.metrix.gameW;
      this.els.canvas.height = this.metrix.gameH;
   }

}