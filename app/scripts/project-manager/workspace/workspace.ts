import Component from "../../framework/component";
import WSRender from "./ws_render";
import WSData from "./ws_data";
import WSConverter from "./ws_converter";
import WSEvents from "./ws_events";
import KEYS from "../../keys";

export default class Workspace extends Component {
   private playing: boolean = false;
   private animateFrameId: number = 0;
   
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
      this.onresize();
      this.render.render();
   }

   private initRender(): void { 
      this.render.init(this.els.canvas, this.els.root);
   }

   private initEvents(): void {
      window.addEventListener('resize', (event) => {
         this.onresize();
      });

      window.addEventListener('load', () => { 
         this.onresize();
      });

      this.addEvent('resize', () => { 
         this.onresize();
      });

      (<Element>this.els.root).addEventListener('mouseenter', () => { 
         this.isHover = true;
      });

      (<Element>this.els.root).addEventListener('mouseleave', () => { 
         this.isHover = false;
      });

      document.addEventListener('keydown', (event) => { 
         let check = this.playing && this.isHover && (event.keyCode in KEYS);

         if (!check) return;

         if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            
            switch (KEYS[event.keyCode]) {
               case 'zoomAdd':
                  this.data.zoom.add();
                  break;
               case 'zoomSub':
                  this.data.zoom.sub();
                  break;
               case 'zoomDef':
                  this.data.zoom.reset();
                  break;
            }
         }
      });

      document.addEventListener('keydown', (event) => { 
         let check = this.playing && this.isHover && (event.keyCode in KEYS)
      
         if (!check) return;
         event.preventDefault();
      });
   }

   private onresize() { 
      this.render.updateMetrix(); 
      this.render.updateSize();
   }

   private getElements(root: Element): void { 
      this.els.root = root;
      this.els.canvas = root.querySelector('.workspace__canvas');
   }
}