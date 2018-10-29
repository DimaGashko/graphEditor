import WSData from "./ws_data";
import WSConverter from "./ws_converter";
import WSVertex from "./ws_graph/ws_vertex";
import Component from "../framework/component";
import Vector from "../modelComponents/vector";

export interface IWSEvent {
   targ: WSVertex | null,
   cursorXY: Vector,
}

type CanvEl = HTMLCanvasElement;

export default class WSEvents extends Component {
   private enterObj: WSVertex | null = null;

   public reset() { 
      this.enterObj = null;
   }

   constructor(private data: WSData, private converter: WSConverter) {
      super();
   }

   public init(root: CanvEl): void {
      this.els.root = root;
      this.initEvents();
   }

   private initEvents(): void {
      (<CanvEl>this.els.root).addEventListener('mousedown', (event) => {
         this.process('mousedown', event);
      });

      window.addEventListener('mouseup', (event) => {
         this.process('mouseup', event);
      });

      window.addEventListener('mousemove', (event) => {
         this.process('mousemove', event);
      });

      (<CanvEl>this.els.root).addEventListener('mouseleave', (event) => {
         this.triggerLeave(event);
      });
   }

   private process(type: string, event: MouseEvent): void {
      let targ = this.getObjOn(this.getCoords(event));
      if (!targ) {
         this.triggerLeave(event);
      };

      this.trigger(type, targ, event);

      if (targ && targ !== this.enterObj) {
         this.triggerLeave(event);

         this.enterObj = targ;
         this.trigger('mouseenter', targ, event);
      }
   }

   private triggerLeave(event: MouseEvent): void {
      if (!this.enterObj) return;

      this.trigger('mouseleave', this.enterObj, event);
      this.enterObj = null;
   }

   public trigger(type: string, targ: WSVertex | null, event: MouseEvent) {
      let wsEvent: IWSEvent = {
         targ: targ,
         cursorXY: this.getCoords(event),
      }

      super.trigger(type, wsEvent);
      if (targ) event.stopPropagation();
   }

   private getObjOn(coords: Vector): WSVertex | null {
      let verteces = this.data.wsGraph.graph.getVertices();

      //В обратном порядке, что бы первой находить объекты сверху
      for (let i = verteces.length - 1; i >= 0; i--) {
         let targ: WSVertex = verteces[i].targ;

         if (targ.checkContainPoint(coords)) {
            return targ;
         }
      }

      return null;
   }

   private getCoords(event: MouseEvent): Vector {
      var box = this.els.root.getBoundingClientRect();

      var onDisplay = new Vector(event.pageX, event.pageY).sub(new Vector(
         box.left + pageXOffset,
         box.top + pageYOffset
      ));

      return this.converter.toReal(onDisplay);
   }

}