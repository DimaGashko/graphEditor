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

   private pos = 0;

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
      let len = this.strExp.length;
   
      let nextPos = this.getLastDigitIndex(this.strExp, this.pos);
      let operand1 = this.strExp.slice(this.pos, nextPos);
      this.pos = nextPos;

      let operator = this.strExp[this.pos++];

      nextPos = this.getLastDigitIndex(this.strExp, pos);
      let operand2 = this.strExp.slice(pos, nextPos);
      pos = nextPos;

      console.log(operand1, operator, operand2);
   }

   private getLastDigitIndex(str: string, pos: number): number { 
      for (pos; pos < str.length; pos++) { 
         if (str[pos] !== '.' && isNaN(+str[pos])) return pos;
      }

      return pos;
   }

   private calc() { 

   }
}

export class ExpNode {

}