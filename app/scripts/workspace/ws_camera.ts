import Component from "../framework/component";
import Vector from "../modelComponents/vector";

export default class WSCamera extends Component {    
   private def: Vector = new Vector(1, 1);
   private val: Vector = this.def.copy();

   public get(): Vector { 
      return this.val.copy();
   }

   public set(val: Vector) { 
      this.val = val.copy();
      this.trigger('change');
   }

   public goTo(val: Vector): void { 
      this.set(val);
   }

   public goHome(): void { 
      this.set(this.def.copy()); 
   }

}