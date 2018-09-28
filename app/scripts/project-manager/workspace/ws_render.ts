import Component from "../../framework/component";
import WSData from "./ws_data";
import WSConverter from "./ws_converter";
import Vector from "../../math/vector/vector";
import WSVertex from "./ws_graph/ws_vertex";
import Vertex from "../../math/graph/vertex";
import Edge from "../../math/graph/edge";
import WSEdge from "./ws_graph/ws_edge";
import { getBezieCoords } from "../../math/geometry/geometry";
import Graph from "../../math/graph/graph";

type CanvEl = HTMLCanvasElement;
type Context = CanvasRenderingContext2D;

export default class WSRender extends Component {
   private canvases: { [item: string]: CanvEl } = {};
   private ctxes: { [item: string]: Context } = {};

   constructor(private data: WSData, private converter: WSConverter) { 
      super();
   }

   public init(root: Element) { 
      this.els.root = root;

      this.initCanvases();
      this.initCtxes();
   }

   public renderGraph(): void {
      this.clearFor(this.ctxes.graph);

      this.getMultipleGroups().forEach((group) => { 
         const multipleStart: number = (group.length % 2 === 0) ? 1 : 0;

         group.forEach((edge, index) => { 
            if (edge.v1 !== edge.v2) { 
               this.drowEdge(edge, multipleStart + index, group.length);
            
            } else {
               this.drowLoopEdge(edge, index); 
            }
         });
      });
      
      this.getGraph().getVertices().forEach((vertex) => { 
         this.drowVertex(vertex);
      });
   }

   /**
    * Возвращает ребер разбитых по кратности
    */
   getMultipleGroups(): Edge[][] { 
      let groups: Edge[][] = [];

      this.getGraph().getEdges().forEach((edge) => {
         let groupIndex: number = -1;

         for (let i = groups.length - 1; i >= 0; i--) {
            if (groups[i] && Graph.isMultipleEdges(groups[i][0], edge)) { 
               groupIndex = i;
            }
         }

         if (groupIndex !== -1) {
            groups[groupIndex].push(edge);
         
         } else { 
            groups.push([edge]);
         }
      });

      return groups;
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
      let ctx = this.ctxes.graph;
      ctx.save();

      let zoom = this.data.zoom.getScalarZoom();
      let targ: WSVertex = vertex.targ;
      let xy = this.converter.toDisplay(targ.coords);
      let r = targ.radius.scale(this.data.zoom.get());

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

      ctx.fillText(targ.getName(), xy.x, xy.y, 100 * zoom);

      ctx.restore();
   } 

   /**
    * Рисует ребро графа
    * 
    * @param {Edge} egde верниша
    * @param {number} multiple кратность этого ребра (если есть кратные 
    * ребра, то первое из кратных ребер - 0, второе - 1)
    * @param {number} edgesCount количество кратных ребер
    */
   private drowEdge(edge: Edge, multiple: number = 0, edgesCount: number) { 
      if (multiple < 0) multiple = -multiple;

      let ctx = this.ctxes.graph;
      ctx.save();

      let zoom = this.data.zoom.getScalarZoom();
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
      let r2 = targV2.radius.x * zoom;

      ctx.beginPath();
      ctx.lineWidth = targE.style.lineWidth * zoom;

      //Переносим начало координат в конец ребра
      ctx.translate(xy2.x, xy2.y);

      //Поворачиваем ребро горизонтально
      ctx.rotate(Math.atan2(xy2.y - xy1.y, xy2.x - xy1.x));

      let centerX = -edgeW / 2;

      //Вычисляем степерь изгиба ребра
      let controllY = 0;
      let offset = (edgesCount % 2 === 0) ? -20 : 0;

      if (multiple === 0) { 
         controllY = 0;
      
      } else if (multiple % 2 === 0) {
         controllY = -((multiple - 2) * 20 + 40 + offset) * zoom;
       
      } else { 
         controllY = ((multiple - 1) * 20 + 40 + offset) * zoom;
      }

      if (xy1.y < xy2.y) { 
         controllY = -controllY;
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
    * @param {number} multiple кратность этого ребра (если есть кратные 
    * ребра, то первое из кратных ребер - 0, второе - 1)
    */
   private drowLoopEdge(edge: Edge, multiple: number = 0) { 
      let ctx = this.ctxes.graph;
      ctx.save();

      let zoom = this.data.zoom.getScalarZoom();
      let targE: WSEdge = edge.targ; 
      let targV: WSVertex = edge.v1.targ;

      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.font = `${targE.style.fontVariant} 
         ${targE.style.fontSize * zoom}px ${targE.style.fontFamily}`;

      ctx.lineWidth = targE.style.loopWidth;

      let xy = this.converter.toDisplay(targV.coords);

      //Радиус окружности ребра-петли
      let r = (Math.min(targV.radius.x, 30) + multiple * 10) * zoom;
      
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

   public renderGrid(): void { 
      this.clearFor(this.ctxes.grid);
      let ctx = this.ctxes.grid;

      let c = this.converter.toDisplay(new Vector(0, 0));
      //console.log(c)
      //ctx.fillRect(c.x - 5, c.y - 5, 10, 10);

      ctx.save();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 0.1;

      let scalarZoom = this.data.zoom.getScalarZoom();

      if (scalarZoom > 0.75) { 
         this.drowGrid(new Vector(10, 10));
      }

      if (scalarZoom > 0.25) {
         this.drowGrid(new Vector(100, 100));
      }

      if (scalarZoom < 0.75) {
         this.drowGrid(new Vector(1000, 1000));
      }

      ctx.restore();
   }

   private drowGrid(step: Vector): void { 
      let ctx = this.ctxes.grid;

      let begin = this.converter.toReal(new Vector(0, 0));
      let end = this.converter.toReal(this.data.wsSize);
      
      begin = new Vector(
         begin.x - begin.x % step.x - step.x,
         begin.y - begin.y % step.y - step.x,
      );

      let lines = new Vector(
         Math.abs(end.x - begin.x) / step.x + 2,
         Math.abs(end.y - begin.y) / step.y + 2,
      );

      ctx.beginPath();

      for (let i = 0; i < lines.x; i++) { 
         let x = this.converter.toDisplay(new Vector(begin.x + i * step.x, 0)).x;

         ctx.moveTo(x, 0);
         ctx.lineTo(x, this.data.wsSize.y);
      }

      for (let i = 0; i < lines.x; i++) { 
         let y = this.converter.toDisplay(new Vector(0, begin.y + i * step.y)).y;

         ctx.moveTo(0, y);
         ctx.lineTo(this.data.wsSize.x, y);
      }

      ctx.stroke();
   }

   private getEdgeText(edge: Edge): string { 
      return `${(<WSEdge>edge.targ).getName()}${(edge.weight !== 1) ? ` (${edge.weight})` : ''}`
   }

   private initCanvases(): void { 
      const r: Element = this.els.root;

      this.canvases.graph = <CanvEl>r.querySelector('.workspace__graph_canvas');
      this.canvases.grid = <CanvEl>r.querySelector('.workspace__grid_canvas');
   }

   private initCtxes(): void {
      this.ctxes.graph = <Context>this.canvases.graph.getContext('2d');
      this.ctxes.grid = <Context>this.canvases.grid.getContext('2d');
   }

   public updateMetrix(): void { 
      this.data.wsSize = new Vector(
         this.els.root.clientWidth,
         this.els.root.clientHeight
      );
   }

   public updateSize(): void {
      this.updateSizeFor(this.canvases.graph);
      this.updateSizeFor(this.canvases.grid);
   }

   private clear() {
      this.clearFor(this.ctxes.graph);
      this.clearFor(this.ctxes.grid);
   }

   public updateSizeFor(canv: CanvEl): void {
      canv.width = this.data.wsSize.x;
      canv.height = this.data.wsSize.y;
   }

   private clearFor(ctx: Context) {
      ctx.clearRect(0, 0, this.data.wsSize.x, this.data.wsSize.y);
   }

}