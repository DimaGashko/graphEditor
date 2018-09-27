import Vector from "../../math/vector/vector";

export default class WSZoom { 
   private min: Vector = new Vector(0.1, 0.1);
   private max: Vector = new Vector(5, 5);
   private def: Vector = new Vector(1, 1);
   private step: Vector = new Vector(0.05, 0.05);

   private val: Vector = this.def.copy();

   public get(): Vector { 
      return this.val.copy();
   }

   public getScalarZoom(): number { 
      return Math.max(this.val.x, this.val.y);
   }

   public set(val: Vector) { 
      this.val = this.correct(val);
   }

   public add(): void { 
      this.set(this.val.add(this.step));
   }

   public sub(): void { 
      this.set(this.val.sub(this.step));
   }

   public reset(): void { 
      this.set(this.def.copy());
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