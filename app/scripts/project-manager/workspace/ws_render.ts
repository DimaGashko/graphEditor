import Component from "../../framework/component";
import WSData from "./ws_data";
import WSConverter from "./ws_converter";
import Vector from "../../math/vector/vector";
import WSVertex from "./ws_graph/ws_vertex";

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
      let ctx = this.ctx, z = this.data.zoom, conv = this.converter;
      let graph = this.data.wsGraph.graph;
      this.clear();

      ctx.beginPath();

      graph.getEdges().forEach((edge) => { 
         let targ1: WSVertex = edge.v1.targ;
         let targ2: WSVertex = edge.v2.targ;

         let xy1 = conv.toDisplay(targ1.coords);
         let xy2 = conv.toDisplay(targ2.coords);

         ctx.moveTo(xy1.x, xy1.y);
         ctx.lineTo(xy2.x, xy2.y);
      });

      ctx.lineWidth = 2;
      ctx.stroke();

      graph.getVertices().forEach((vertex) => { 
         let targ: WSVertex = vertex.targ;
         let xy = conv.toDisplay(targ.coords);

         ctx.moveTo(xy.x, xy.y);
         ctx.arc(xy.x, xy.y, 10, 0, Math.PI * 2);
      });

      ctx.fill();
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