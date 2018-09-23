import Component from "../../framework/component";

export default class Workspace extends Component {
   private ctx: CanvasRenderingContext2D | null = null;
   private metrix: any = {};

   constructor(root: Element) { 
      super();

      this.getElements(root);
      this.init();
      this.initEvents();
   }

   private initEvents(): void {
      window.addEventListener('resize', (event) => {
         this.onresize();
      });
   }

   private onresize() { 
      this.updateMetrix();
      this.updateSize();
   }

   private updateMetrix(): void { 
      this.metrix.gameW = this.els.root.offsetWidth;
      this.metrix.gameH = this.els.root.offsetHeight;
   }

   private updateSize(): void {
      this.els.canvas.width = this.metrix.gameW;
      this.els.canvas.heigh = this.metrix.gameH;
   }

   private init(): void { 
      this.ctx = (<HTMLCanvasElement>this.els.canvas).getContext('2d');
   }

   private getElements(root: Element): void { 
      this.els.root = root;
      this.els.canvas = root.querySelector('.workspace__canvas');
   }
}