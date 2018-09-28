import Vector from "../../math/vector/vector";
import FPS from "../../helpers/fps";
import Component from "../../framework/component";

export default class WSZoom extends Component { 
   private animateFrame: number = 0;
   
   private min: Vector = new Vector(0.1, 0.1);
   private max: Vector = new Vector(5, 5);
   private def: Vector = new Vector(1, 1);
   private step: Vector = new Vector(0.05, 0.05);

   private val: Vector = this.def.copy();

   public get(): Vector { 
      return this.val.copy();
   }

   public getScalarZoom(): number { 
      return Math.min(this.val.x, this.val.y);
   }

   public set(val: Vector) { 
      this.val = this.correct(val);
   }

   public add(val: Vector = this.step): void { 
      this.set(this.get().add(val));
   }

   public sub(val: Vector = this.step): void { 
      this.set(this.get().sub(val));
   }

   public reset(animate: boolean = true, time: number = 450): void { 
      if (animate) { 
         this.animateTo(this.def.copy(), time);
      } else {
         this.set(this.def.copy());  
      }
   }

   public animateTo(val: Vector, time: number): void { 
      val = val.copy();

      if (this.animateFrame) {
         cancelAnimationFrame(this.animateFrame);
      }

      let cadrs = time / FPS.get();

      let step = new Vector(
         (val.x - this.get().x) / cadrs,
         (val.y - this.get().y) / cadrs
      );

      let zoom = this;

      requestAnimationFrame(function tik() {
         cadrs--

         zoom.add(step);

         if (cadrs <= 0) { 
            zoom.set(val);
            zoom.trigger('animateEnd')
            return;
         };

         requestAnimationFrame(tik);
      });

   }

   private correct(val: Vector): Vector { 
      return new Vector(
         this.correctByAxis(val.x, 'x'),
         this.correctByAxis(val.y, 'y'),
      )
   }

   private correctByAxis(val: number, axis: 'x' | 'y'): number { 
      if (val < this.min[axis]) val = this.min[axis];
      else if (val > this.max[axis]) val = this.max[axis];

      return val;
   }
}