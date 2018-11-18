import Graph from "./graph/graph";
import Vertex from "./graph/vertex";

class Operator { 
   constructor(
      public readonly type: string,
      public readonly precedence: number,
      public readonly call: (a: number, b: number) => number
   ) { 

   }

}

export class NodeExp {
   constructor(
      public readonly type: 'operand' | 'operator',
      public readonly val: number | Operator,
   ) { 

   }
}

/**
 * Математическое уравнение 
 * 
 * const exp = new Expression("2+3*6");
 * ext.strExt //"2+3*6"
 * exp.res //20
 * exp.tree //дерево выражения
 */
export default class Expression { 
   private expTree: Graph<null, NodeExp> = null;
   private _res: number = null;
   
   private pos: number = 0;
   private strExp: string;

   /**
    * @param strExp Математическое выражение в виде строки 
    */
   constructor(strExp: string) { 
      this.correctStrExp(strExp);
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

   private correctStrExp(strExp: string) {
      return;
      for (let pos = 0; pos < strExp.length; pos++) { 
         //if (!(strExp[pos] in Expression.operators)) continue;

         strExp = strExp.slice(0, pos) + ')' + strExp[pos] +
            '(' + strExp.slice(pos + 1);
         
         pos += 1;
      }

      strExp = `(${strExp})`;

      console.log(strExp);
   }

   private parse() {
      let close1 = this.getCloseIndex(this.strExp, 1);
      let operator = this.strExp[close1 + 1];
      let close2 = this.getCloseIndex(this.strExp, close1 + 2);
   }

   private getCloseIndex(strExp: string, pos: number) { 
      let open = 0;

      for (pos; pos < strExp.length; pos++) { 
         if (strExp[pos] === '(') open++;
         else if (strExp[pos] === ')') { 
            if (open === 0) return pos;
            open--;
         }
      }

      return -1;
   }

   private calc() { 

   }

   private operators: Operator[] = [

      new Operator('+', 13, (a, b) => a + b),
      new Operator('-', 13, (a, b) => a - b),
      new Operator('*', 14, (a, b) => a * b),
      new Operator('/', 14, (a, b) => a / b),
      new Operator('%', 14, (a, b) => a % b),

   ].sort((a, b) => a.precedence - b.precedence);

}