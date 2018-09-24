import Component from "../../framework/component";
import WSData from "./ws_data";
import Vector from "../../other/vector";
import WSConverter from "./ws_converter";


export default class WSRender extends Component {
   private ctx: CanvasRenderingContext2D = (<CanvasRenderingContext2D>{});

   constructor(private data: WSData, private converter: WSConverter) { 
      super();
   }

   public init(canvas: HTMLCanvasElement, root: Element) { 
      this.els.root = root;

      this.els.canvas = canvas;
      const ctx = canvas.getContext('2d');

      if (ctx) this.ctx = ctx;
   }

   public render(): void {
      this.clear();

      let coords = (this.converter.toDisplay(new Vector(-280, -280)));
      let size = new Vector(560, 560).scale(this.data.zoom)

      this.ctx.fillRect(coords.x, coords.y, size.x, size.y);
   }

   public updateMetrix(): void { 
      this.data.wsSize = new Vector(
         this.els.root.clientWidth,
         this.els.root.clientHeight
      );
   }

   public updateSize(): void {
      this.els.canvas.width = this.data.wsSize.x;
      this.els.canvas.height = this.data.wsSize.y;
   }

   private clear() {
      this.ctx.clearRect(0, 0, this.data.wsSize.x, this.data.wsSize.y);
   }

}