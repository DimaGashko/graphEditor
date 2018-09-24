import Component from "../../framework/component";
import WSData from "./ws_data";
import WSConverter from "./ws_converter";
import Vector from "../../math/vector/vector";
import WSVertex from "./ws_graph/ws_vertex";
import Vertex from "../../math/graph/vertex";
import Edge from "../../math/graph/edge";
import WSEdge from "./ws_graph/ws_edge";

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

      this.getGraph().getEdges().forEach((edge) => { 
         this.drowEdge(edge);
      });

      this.getGraph().getVertices().forEach((vertex) => { 
         this.drowVertex(vertex);
      });
   }

   private getGraph() { 
      return this.data.wsGraph.graph;
   }   

   private drowVertex(vertex: Vertex) { 
      let ctx = this.ctx;
      ctx.save();

      let zoom = Math.max(this.data.zoom.x, this.data.zoom.y);
      let targ: WSVertex = vertex.targ;
      let xy = this.converter.toDisplay(targ.coords);
      let r = targ.radius.scale(this.data.zoom);

      ctx.beginPath();

      //Круг фона
      ctx.fillStyle = targ.style.background,
      
      ctx.arc(xy.x, xy.y, r.x, 0, Math.PI * 2);
      ctx.fill();

      //Граница
      ctx.lineWidth = targ.style.borderWidth * zoom;
      ctx.strokeStyle = targ.style.borderColor;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      
      ctx.arc(xy.x, xy.y, r.x, 0, Math.PI * 2);
      ctx.stroke();

      //Название
      ctx.font = `${targ.style.fontVariant} 
         ${targ.style.fontSize * zoom}px ${targ.style.fontFamily}`;
      
      ctx.fillStyle = targ.style.color;

      ctx.shadowColor = targ.style.background;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 2;

      ctx.fillText(targ.name, xy.x, xy.y, 100 * zoom);

      ctx.restore();
   }

   private drowEdge(edge: Edge) { 
      let ctx = this.ctx;
      ctx.save();

      let zoom = Math.max(this.data.zoom.x, this.data.zoom.y);
      let targE: WSEdge = edge.targ; 
      let targV1: WSVertex = edge.v1.targ;
      let targV2: WSVertex = edge.v2.targ;

      let xy1 = this.converter.toDisplay(targV1.coords);
      let xy2 = this.converter.toDisplay(targV2.coords);

      ctx.beginPath();
      ctx.lineWidth = targE.style.lineWidth * zoom;
      ctx.strokeStyle = targE.style.lineColor;

      ctx.moveTo(xy1.x, xy1.y);
      ctx.lineTo(xy2.x, xy2.y);
      ctx.stroke();

      //Стрелка для ориентировоного ребра
      if (edge.type === 'uni') { 
         ctx.strokeStyle = 'green';
         ctx.moveTo(xy1.x, xy1.y);
         ctx.lineTo(xy2.x, xy2.y);
         ctx.stroke();
      }

      ctx.restore();
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