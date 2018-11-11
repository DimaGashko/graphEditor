import Graph from "./graph/graph";

/**
 * Математическое уравнение 
 * 
 * const exp = new Expression("2+3*6");
 * ext.strExt //"2+3*6"
 * exp.res //20
 * exp.tree //дерево выражения
 * 
 * Если нужен, например, только резултат:
 * const res = new Expression("2+3*6").res;
 */
export default class Expression { 
   private expTree: Graph<null, ExpNode> = null;
   private _res: number = null;

   /**
    * @param strExp Математическое выражение в виде строки 
    */
   constructor(public readonly strExp: string) {     
      this.parse();
      this.calc();
   }
   
   /**
    * @returns результат выражения
    */
   public get res(): number { 
      return this._res;
   }

   /**
    * @returns представление графа в виде дерева
    */
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