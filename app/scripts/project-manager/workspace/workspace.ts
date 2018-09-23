import Component from "../../framework/component";

export default class Workspace extends Component {
   private ctx: CanvasRenderingContext2D | null = null;
   private metrix: any = {};

   constructor() { 
      super();
   }

   public init(root: Element) { 
      this.getElements(root);
      this.initEvents();
      this.initCanvas();
   }

   private initEvents(): void {
      window.addEventListener('resize', (event) => {
         this.onresize();
      });

      window.addEventListener('load', () => { 
         this.onresize();
      });
   }

   private onresize() { 
      this.updateMetrix();
      this.updateSize();
   }

   private updateMetrix(): void { 
      this.metrix.gameW = this.els.root.clientWidth;
      this.metrix.gameH = this.els.root.clientHeight;
   }

   private updateSize(): void {
      this.els.canvas.width = this.metrix.gameW;
      this.els.canvas.height = this.metrix.gameH;
   }

   private initCanvas(): void { 
      this.ctx = (<HTMLCanvasElement>this.els.canvas).getContext('2d');
   }

   private getElements(root: Element): void { 
      this.els.root = root;
      this.els.canvas = root.querySelector('.workspace__canvas');
   }
}