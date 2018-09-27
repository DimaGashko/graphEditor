import Component from "../../framework/component";
import WSData from "./ws_data";
import WSConverter from "./ws_converter";
import Vector from "../../math/vector/vector";
import WSVertex from "./ws_graph/ws_vertex";
import Vertex from "../../math/graph/vertex";
import Edge from "../../math/graph/edge";
import WSEdge from "./ws_graph/ws_edge";
import { getBezieCoords } from "../../math/geometry/geometry";

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

      let drewEdges: Edge[] = [];

      this.getGraph().getEdges().forEach((edge) => {
         let multipleCount = drewEdges.reduce((count, drew) => { 
            let v11 = drew.v1.targ, v12 = drew.v2.targ;
            let v21 = edge.v1.targ, v22 = edge.v2.targ;

            if ((v11 === v21 && v12 === v22) || (v11 === v22 && v12 === v21)) { 
               return count + 1;
            }

            return count;
         }, 0);

         if (edge.v1 !== edge.v2) { 
            this.drowEdge(edge, multipleCount);
         
         } else {
            this.drowLoopEdge(edge, multipleCount); 
         }

         drewEdges.push(edge);
      });
      
      this.getGraph().getVertices().forEach((vertex) => { 
         this.drowVertex(vertex);
      });
   }

   private getGraph() { 
      return this.data.wsGraph.graph;
   }   

   /**
    * Рисует вершину графа
    * 
    * @param {Vertex} vertex верниша
    */
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
      ctx.strokeStyle = targ.style.lineColor;
      
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

   /**
    * Рисует ребро графа
    * 
    * @param {Edge} egde верниша
    * @param {number} multipleCount кратность этого ребра (если есть кратные 
    * ребра, то первое из кратных ребер - 0, второе - 1)
    */
   private drowEdge(edge: Edge, multipleCount: number = 0) { 
      let ctx = this.ctx;
      ctx.save();

      let zoom = Math.max(this.data.zoom.x, this.data.zoom.y);
      let targE: WSEdge = edge.targ; 
      let targV1: WSVertex = edge.v1.targ;
      let targV2: WSVertex = edge.v2.targ;

      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.font = `${targE.style.fontVariant} 
         ${targE.style.fontSize * zoom}px ${targE.style.fontFamily}`;

      let xy1 = this.converter.toDisplay(targV1.coords);
      let xy2 = this.converter.toDisplay(targV2.coords);
      let edgeW = Math.hypot(xy1.x - xy2.x, xy1.y - xy2.y);
      let r1 = targV1.radius.x * zoom;
      let r2 = targV2.radius.x * zoom;

      ctx.beginPath();
      ctx.lineWidth = targE.style.lineWidth * zoom;

      //Переносим начало координат в конец ребра
      ctx.translate(xy2.x, xy2.y);

      //Поворачиваем ребро горизонтально
      ctx.rotate(Math.atan2(xy2.y - xy1.y, xy2.x - xy1.x));

      //Смещаем сисему координат в начало конечной вершины
      //ctx.translate(-targV2.radius.x * zoom, 0);

      let centerX = -edgeW / 2;

      let controllY = 0;

      if (multipleCount === 0) { 
         controllY = 0;
      
      } else if (multipleCount % 2 === 0) {
         controllY = (-40 * zoom) * (multipleCount - 1);
      
      } else { 
         controllY = 40 * zoom * multipleCount;
      } 
      
      let begin = new Vector(0, 0);
      let controll = new Vector(centerX, controllY);
      let end = new Vector(-edgeW, 0);
 
      ctx.strokeStyle = targE.style.lineColor;
      ctx.moveTo(begin.x, begin.y);
      ctx.quadraticCurveTo(controll.x, controll.y, end.x, end.y);
      ctx.stroke();

      //Стрелка
      if (edge.type === 'uni') { 
         ctx.save();
         ctx.beginPath();

         let timeArrow = r2 / edgeW; //Время, когда кривая 
            //будет на окружности второй вершины
         
         let arrStart = getBezieCoords(begin, controll, end, timeArrow);
         ctx.translate(arrStart.x, arrStart.y);

         //Поворасиваем СК по направляющей кривой
         ctx.rotate(Math.atan2(controll.y, centerX));

         //Рисуем стрелочку
         ctx.beginPath();
         ctx.moveTo(0, 0);
         ctx.lineTo(targE.style.arrowSize * zoom, -5 * zoom);
         ctx.moveTo(0, 0);
         ctx.lineTo(targE.style.arrowSize * zoom, 5 * zoom);

         ctx.stroke();
         ctx.restore();
      }

      //Текст
      ctx.save();
      ctx.fillStyle = targE.style.color;

      let textCoords = getBezieCoords(begin, controll, end, 0.5);
      ctx.translate(textCoords.x, textCoords.y);

      if (xy1.x > xy2.x) { 
         ctx.rotate(Math.PI);
      }

      ctx.fillText(this.getEdgeText(edge), 0, -10 * zoom);

      ctx.restore();

      ctx.restore();
   }

   /**
    * Рисует ребро-петлю графа
    * 
    * @param {Edge} egde верниша
    * @param {number} multipleCount кратность этого ребра (если есть кратные 
    * ребра, то первое из кратных ребер - 0, второе - 1)
    */
   private drowLoopEdge(edge: Edge, multipleCount: number = 0) { 
      let ctx = this.ctx;
      ctx.save();

      let zoom = Math.max(this.data.zoom.x, this.data.zoom.y);
      let targE: WSEdge = edge.targ; 
      let targV: WSVertex = edge.v1.targ;

      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.font = `${targE.style.fontVariant} 
         ${targE.style.fontSize * zoom}px ${targE.style.fontFamily}`;

      ctx.lineWidth = targE.style.loopWidth;

      let xy = this.converter.toDisplay(targV.coords);

      //Радиус окружности ребра-петли
      let r = (Math.min(targV.radius.x, 20) + multipleCount * 10) * zoom;
      
      ctx.beginPath();

      //Рисуем ребро-перлю
      ctx.arc(xy.x - r / Math.SQRT2, xy.y - r / Math.SQRT2, r, 0, Math.PI * 2);
      ctx.stroke();  
      
      //Переносим СК на круг петли (под углом 45)
      let rx = xy.x - r / Math.SQRT2 * 2;
      let ry = xy.y - r / Math.SQRT2 * 2;

      ctx.translate(rx, ry);
      ctx.rotate(-Math.PI / 4);
   
      //Текст
      ctx.font = `${targE.style.fontVariant} 
         ${targE.style.loopFontSize * zoom}px ${targE.style.fontFamily}`;
      
      ctx.fillText(this.getEdgeText(edge), 0, -10 * zoom);
      
      //Arrow
      ctx.rotate(Math.PI / 30);
      ctx.moveTo(0, 0);
      ctx.lineTo(targE.style.loopArrowSize * zoom, 5 * zoom);
      ctx.moveTo(0, 0);
      ctx.lineTo(targE.style.loopArrowSize * zoom, -5 * zoom);
      ctx.stroke();

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