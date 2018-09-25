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
      
      ctx.arc(xy.x, xy.y, r.x, 0, Math.PI * 2);
      ctx.stroke();

      //Название
      ctx.font = `${targ.style.fontVariant} 
         ${targ.style.fontSize * zoom}px ${targ.style.fontFamily}`;
      
      ctx.fillStyle = targ.style.color;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      ctx.fillText(targ.name, xy.x, xy.y, 100 * zoom);

      ctx.restore();
   }

   private drowEdge(edge: Edge) { 
      if (edge.v1 === edge.v2) { 
         this.drowLoopEdge(edge);
      }

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

      //Текст
      ctx.font = `${targE.style.fontVariant} 
         ${targE.style.fontSize * zoom}px ${targE.style.fontFamily}`;
      
      ctx.fillStyle = targE.style.color;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      let offsetX = 0; (xy1.x < xy2.x) ? 10 : -10;
      let offsetY = (xy1.y < xy2.y) ? 10 : -10;

      ctx.fillText(this.getEdgeText(edge),
         (xy1.x + xy2.x) / 2 + offsetX * zoom,
         (xy1.y + xy2.y) / 2 + offsetY * zoom
      );

      //Стрелка для ориентировоного ребра (не петли)
      if (edge.type === 'uni' && targV1 !== targV2) { 
         ctx.save();
         ctx.beginPath();

         //Переносим начало координат в конец ребра
         ctx.translate(xy2.x, xy2.y);

         //Поворачиваем ребро горизонтально
         ctx.rotate(Math.atan2(xy2.y - xy1.y, xy2.x - xy1.x));

         //Смещаем сисему координат в начало конечной вершины
         ctx.translate(-targV2.radius.x * zoom, 0);
         //(Теперь начало координат указывает на видимую часть конца ребра)

         //Рисуем стрелочку
         ctx.beginPath();
         ctx.moveTo(0, 0);
         ctx.lineTo(-targE.arrowSize * zoom, -5 * zoom);
         ctx.moveTo(0, 0);
         ctx.lineTo(-targE.arrowSize * zoom, 5 * zoom);

         ctx.stroke();
         ctx.restore();
      }

      ctx.restore();
   }

   private drowLoopEdge(edge: Edge) { 
      let ctx = this.ctx;
      ctx.save();

      let zoom = Math.max(this.data.zoom.x, this.data.zoom.y);
      let targE: WSEdge = edge.targ; 
      let targV: WSVertex = edge.v1.targ;

      let xy = this.converter.toDisplay(targV.coords);
      let r = targV.radius.x * zoom;

      ctx.beginPath();
      ctx.arc(xy.x - r, xy.y - r, r, 0, Math.PI * 2);
      ctx.stroke();

      //Текст
      ctx.font = `${targE.style.fontVariant} 
         ${targE.style.fontSize * zoom}px ${targE.style.fontFamily}`;
      
      ctx.fillStyle = targE.style.color;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      ctx.fillText(this.getEdgeText(edge),
         xy.x - r*2 + -5 * zoom,
         xy.y - r*2 + -5 * zoom
      );

      ctx.restore();
   }

   private getEdgeText(edge: Edge): string { 
      return `${edge.targ.name}${(edge.weight !== 1) ? ` (${edge.weight})` : ''}`
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