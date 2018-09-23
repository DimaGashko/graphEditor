import Component from "../../framework/component";
import WSData from "./ws_data";
import WSCamera from "./ws_camera";


export default class WSRender extends Component {
   private ctx: CanvasRenderingContext2D = (<CanvasRenderingContext2D>{});

   private metrix: any = {}; 
   
   constructor(private data: WSData, private camera: WSCamera) { 
      super();
   }

   public init(canvas: HTMLCanvasElement, root: Element) { 
      this.els.root = root;

      this.els.canvas = canvas;
      const ctx = canvas.getContext('2d');

      if (ctx) this.ctx = ctx;
   }

   public render(): void {
      this.ctx.fillRect(-5, -5, 10, 10);
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