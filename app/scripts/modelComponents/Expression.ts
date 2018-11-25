import Graph from "./graph/graph";
import Vertex from "./graph/vertex";
import Edge from "./graph/edge";

export class NodeExp {
   constructor(
      public readonly type: 'operand' | 'operator',
      public readonly val: number | Operator,
   ) { 

   }

   public toString() { 
      return this.val.toString();
   }
}

class Operator { 
   constructor(
      public readonly name: string,
      public readonly precedence: number,
      public readonly call: (a: number, b: number) => number
   ) { 

   }

   public toString() { 
      return this.name;
      
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
   private _tree = new Graph<null, NodeExp>();
   private _root: Vertex<NodeExp> = null;
   private _res: number = null;
   
   private _fullStrExp: string;

   /**
    * @param strExp Математическое выражение в виде строки 
    */
   constructor(private _strExp: string) { 
      this.correctStrExp();
      this.parse();
      this.calc();
   }
   
   /** @returns результат выражения */
   public get strExp(): string { 
      return this._strExp;
   }

   /** @returns результат выражения */
   public get res(): number { 
      return this._res;
   }

   /** @returns представление графа в виде дерева */
   public get tree() { 
      return this._tree;
   }

   /** @returns вершина дерева выражения */
   public get root() { 
      return this._root;
   }

   public toString() { 
      return `${this._strExp} = ${this._res}`;
   }

   private correctStrExp() {
      this._fullStrExp = this._strExp;
      return;
      /*for (let pos = 0; pos < strExp.length; pos++) { 
         //if (!(strExp[pos] in Expression.operators)) continue;

         strExp = strExp.slice(0, pos) + ')' + strExp[pos] +
            '(' + strExp.slice(pos + 1);
         
         pos += 1;
      }

      strExp = `(${strExp})`;

      console.log(strExp);*/
   }

   private parse() { 
      this._root = this._parseNext(this._fullStrExp);
      this._tree.addVertex(this._root);
   }

   private _parseNext(strExp: string) { 
      let pos = 0;

      const operand1 = this.getOperand(strExp, pos, (_pos => pos = _pos));

      // It's only operand
      if (pos === strExp.length) { 
         let value = this.toNumber(operand1);
         let newRoot = new Vertex(new NodeExp('operand', value));

         this._tree.addVertex(newRoot);
         return newRoot;
      }

      const operator = this.getOperator(strExp, pos, (_pos => pos = _pos));
      const operand2 = this.getOperand(strExp, pos, (_pos => pos = _pos));

      // Next Step
      const newRoot = new Vertex(new NodeExp('operator', operator));      
      const left = this._parseNext(operand1);
      const right = this._parseNext(operand2);

      this._tree.addEdge(new Edge(newRoot, left, null, 'uni'));
      this._tree.addEdge(new Edge(newRoot, right, null, 'uni'));

      return newRoot;
   }

   private getOperator(strExp: string, pos: number,
      callback: (pos: number) => void): Operator {
    
      if (strExp[pos] in Expression.operatorsHash) { 
         callback(pos + 1);
         return Expression.operatorsHash[strExp[pos]];

      } else {
         throw new SyntaxError(`Extected operator at position ${pos}`);
      }
   }

   private getOperand(strExp: string, pos: number,
      callback: (pos: number) => void): string { 
      
      if (strExp[pos] === '(') {
         const close = this.getCloseIndex(strExp, pos + 1);
         if (close === -1) {
            throw new SyntaxError('Unexpected end of input');
         }

         callback(close + 1);
         return strExp.slice(pos + 1, close);

      } else { 
         let endNumber = this.getEndNumber(strExp, pos);
         if (endNumber === pos) {
            throw SyntaxError(`Extected number at position ${pos}`);
         }

         callback(endNumber);
         return strExp.slice(pos, endNumber);
      }

   }

   private getEndNumber(strExp: string, pos: number) { 
      for (pos; pos < strExp.length; pos++) { 
         if (strExp[pos] !== '.' && isNaN(+strExp[pos])) return pos;
      }

      return pos;
   }

   private toNumber(str: string): number { 
      let res = +str;
      if (isNaN(res)) {
         throw new SyntaxError(`"${str} is not a number"`);
      }

      return res;
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
      this._res = this._calcNext(this._root);
   }

   private _calcNext(vertex: Vertex<NodeExp>): number { 
      const node = vertex.targ;

      if (node.type === 'operator') {
         const nexts = this._tree.getVVertices(vertex);

         return (<Operator>node.val).call(
            this._calcNext(nexts[0]),
            this._calcNext(nexts[1])
         );

      } else if (node.type === 'operand') { 
         return <number>node.val;

      }
   }

   private static operators: Operator[] = [

      new Operator('+', 13, (a, b) => a + b),
      new Operator('-', 13, (a, b) => a - b),
      new Operator('*', 14, (a, b) => a * b),
      new Operator('/', 14, (a, b) => a / b),
      new Operator('%', 14, (a, b) => a % b),

   ].sort((a, b) => a.precedence - b.precedence);

   private static operatorsHash: { [name: string]: Operator } = {
      '+': new Operator('+', 13, (a, b) => a + b),
      '-': new Operator('-', 13, (a, b) => a - b),
      '*': new Operator('*', 14, (a, b) => a * b),
      '/': new Operator('/', 14, (a, b) => a / b),
      '%': new Operator('%', 14, (a, b) => a % b),
   }
   
}