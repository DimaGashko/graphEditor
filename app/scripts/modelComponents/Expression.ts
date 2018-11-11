import Graph from "./graph/graph";

/**
 * Математическое уравнение
 * 
 * const exp = new Expression("2+3*6");
 * ext.strExt //"2+3*6"
 * exp.res //20
 * exp.tree //дерево выражения
 */
export default class Expression { 
   private expTree: Graph<null, ExpNode> = null;
   private _res: number = null;

   constructor(public readonly strExp: string) {     
      this.parse();
      this.calc();
   }

   public get res(): number { 
      return this._res;
   }

   public get tree() { 
      return this.expTree;
   }

   private parse() { 

   }

   private calc() { 

   }
}

export class ExpNode {

}