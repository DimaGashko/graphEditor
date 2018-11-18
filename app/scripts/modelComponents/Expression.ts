import Graph from "./graph/graph";

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
      let operand1 = this.getNumber();
      let operator = this.getOperator();
      let operand2 = this.getNumber();

      

      console.log(operand1, operand2);
   }

   private isEnd(): boolean { 
      return this.pos >= this.strExp.length;
   }

   private getNumber() {
      const str = this.strExp.slice(this.pos);
      const endNum = str.search(/[^\d\.]/);
      const strNum = str.slice(0, endNum);
      const num = +strNum;

      if (isNaN(num)) {
         throw new SyntaxError(`${strNum} is not a number`);
         
      } else if (strNum.length === 0) {
         throw new SyntaxError(`Operator expected (on position ${this.pos})`);
      }

      this.pos += endNum;
      return num;
   }

   private getOperator(): Operator { 
      const strOperator = this.strExp[this.pos];

      if (strOperator in Expression.operators) { 
         this.pos++;
         return Expression.operators[strOperator];
      }

      throw new SyntaxError(`${strOperator} is not an operator`);
   }

   private calc() { 

   }

   private static operators: { [type: string]: Operator } = {
      "+": new Operator('+', 13, (a, b) => { 
         return a + b;
      }),
      "-": new Operator('-', 13, (a, b) => { 
         return a - b;
      }),
      "*": new Operator('*', 14, (a, b) => { 
         return a * b;
      }),
      "/": new Operator('/', 14, (a, b) => { 
         return a / b;
      }),
      "%": new Operator('%', 14, (a, b) => { 
         return a % b;
      }),
   }

}