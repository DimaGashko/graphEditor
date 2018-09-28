import Component from "../../framework/component";
import WSRender from "./ws_render";
import WSData from "./ws_data";
import WSConverter from "./ws_converter";
import WSEvents, { IWSEvent } from "./ws_events";
import KEYS from "../../keys";
import Vector from "../../math/vector/vector";
import WSVertex from "./ws_graph/ws_vertex";

export default class Workspace extends Component {
   private playing: boolean = false; //запущена ли перерисовка Workspace
   private moving: boolean = false; //перемещают ли сейчас Workspace
   private animRedy: boolean = true; 
   private animateFrameId: number = 0;

   //Координаты начала перемещения камеры
   private moveStart: Vector = new Vector();
   private cameraOnStartMoving: Vector = new Vector();

   
   private data: WSData = new WSData();
   private converter: WSConverter = new WSConverter(this.data);
   private render: WSRender = new WSRender(this.data, this.converter);
   private events: WSEvents = new WSEvents(this.data, this.converter);

   //Наведена ли мыш на Workspace
   //По уполнчают true, на случай, 
   //Если у при загрузке страницы мишь уже наведена
   private isHover: boolean = true;

   constructor() { 
      super();
   }

   public init(root: Element) { 
      this.getElements(root);
      this.initEvents();
      this.initRender();
   }

   public start(): void { 
      if (this.playing) return;
      this.playing = true;

      this.trigger('start');

      let workspace: Workspace = this;

      cancelAnimationFrame(this.animateFrameId);
      this.animateFrameId = requestAnimationFrame(function tik() { 
         workspace.tik();

         if (workspace.playing) { 
            requestAnimationFrame(tik);
         }
      }.bind(this));
   }

   public stop() { 
      if (!this.playing) return;
      this.playing = false;

      this.trigger('stop');
   }

   private tik() { 
      this.render.renderGraph();
   }

   private initRender(): void { 
      this.render.init(this.els.canvases);

      this.onresize();
   }

   private initEvents(): void {
      window.addEventListener('resize', () => {
         this.onresize();
      });

      window.addEventListener('load', () => { 
         this.onresize();
      });

      this.addEvent('resize', () => { 
         this.onresize();
      });

      this.data.zoom.addEvent('change', () => { 
         this.render.renderGrid();
      });

      this.data.camera.addEvent('change', () => { 
         this.render.renderGrid();
      });

      (<Element>this.els.root).addEventListener('mouseenter', () => { 
         this.isHover = true;
      });

      (<Element>this.els.root).addEventListener('mouseleave', () => { 
         this.isHover = false;
      });

      this.data.zoom.addEvent('animateEnd', () => {
         this.animRedy = true;
      });

      this.initWSEvents();
      this.initCameraMove();
      this.initZoom();
   }

   private initZoom() { 
      document.addEventListener('keydown', (event) => { 
         let check = this.isActive() && (event.keyCode in KEYS);

         if (!check) return;

         if (event.ctrlKey || event.metaKey) {
            
            requestAnimationFrame(() => { 
               switch (KEYS[event.keyCode]) {
                  case 'zoomAdd':
                     this.addZoom();
                     break;
                  case 'zoomSub':
                     this.subZoom();
                     break;
               }
            });   

         }

      });

      document.addEventListener('keyup', (event) => {  
         let check = this.isActive() && (event.keyCode in KEYS);
         if (!check) return; 

         if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            
            switch (KEYS[event.keyCode]) {
               case 'zoomDef':
                  console.log('zoom res')
                  this.resetZoom();
                  break;
            }
         }
      });

      document.addEventListener('keydown', (event) => { 
         let check = this.isActive() && (event.keyCode in KEYS)
      
         if (!check) return;
         event.preventDefault();
      });
         
      window.addEventListener('wheel', (event) => { 
         if (!this.isActive()) return;

         requestAnimationFrame(() => {
            const delta = event.deltaY / 1000;
         
            if (delta < 0) this.data.zoom.add(new Vector(delta, delta));
            else this.data.zoom.sub(new Vector(-delta, -delta));
         });
      });

   }

   private initCameraMove() { 
      (<HTMLElement>this.els.root).addEventListener('mousedown', (event) => { 
         if (!this.isActive() || event.which !== 1) return;
         this.moveStart = new Vector(event.clientX, event.clientY);
         this.cameraOnStartMoving = this.data.camera.get();
         this.moving = true;
      });

      window.addEventListener('mouseup', (event) => { 
         this.moving = false;
      });

      window.addEventListener('mousemove', (event) => { 
         //this.isHover проверять не нужно, так как нужно 
         //что бы оно пролжало работать и без наведения мыши
         if (!this.playing || !this.moving) return;

         let coords = new Vector(event.clientX, event.clientY);
         let offset = coords.sub(this.moveStart);

         if (offset.x * offset.x + offset.y * offset.y < 25) { 
            return;
         }

         let realOffset = offset.diScale(this.data.zoom.get());
         this.data.camera.goTo(this.cameraOnStartMoving.sub(realOffset));
      });

      window.addEventListener('blur', () => { 
         this.moving = false;
      }); 
   }

   private initWSEvents(): void { 
      this.events.init(this.els.canvases);

      this.events.addEvent('mouseenter', (event: IWSEvent) => { 
         event.targ.style.lineColor = 'green';
         event.targ.style.color = 'green';
         this.els.root.classList.add('workspace-vertex_move');
      });

      this.events.addEvent('mouseleave', (event: IWSEvent) => { 
         event.targ.style.lineColor = '#000';
         event.targ.style.color = '#000';
         this.els.root.classList.remove('workspace-vertex_move');
      });

      this.events.addEvent('mousedown', (event: IWSEvent) => { 
         console.log(event.targ);
      });

      this.events.addEvent('mouseup', (event: IWSEvent) => { 
         //console.log(event);
      });

      this.events.addEvent('mousemove', (event: IWSEvent) => { 
         //console.log(event);
      });
   }

   public isActive(): boolean {
      return this.playing && this.isHover;
   }

   public subZoom(): void {
      this.data.zoom.sub();
   }

   public addZoom(): void { 
      this.data.zoom.add();
   }

   public resetZoom(): void {
      if (!this.animRedy) return;

      //Возвращается в true в событиях
      this.animRedy = false;

      this.data.zoom.reset();
   }

   private onresize() { 
      this.render.updateMetrix(); 
      this.render.updateSize();

      this.render.renderGraph();
      this.render.renderGrid();
   }

   private getElements(root: Element): void { 
      this.els.root = root;
      this.els.canvases = root.querySelector('.workspace__canvases');
   }
}