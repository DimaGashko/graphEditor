import Graph from "./graph/graph";
import Vertex from "./graph/vertex";
import Edge from "./graph/edge";
import { stringLiteral } from "babel-types";

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
   public get stExp(): string { 
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

   private _parse() {
      const root = new Vertex(new NodeExp('operator', Expression.operatorsHash['+']));
      this._root = root;
      
      const _2 = new Vertex(new NodeExp('operand', 2));
      const _6 = new Vertex(new NodeExp('operand', 6));
      const _7 = new Vertex(new NodeExp('operand', 7));
      const _8 = new Vertex(new NodeExp('operand', 8));
      const _9 = new Vertex(new NodeExp('operand', 9)); 

      const mul = new Vertex(new NodeExp('operator', Expression.operatorsHash['*']));
      const dev = new Vertex(new NodeExp('operator', Expression.operatorsHash['/']));
      const plus = new Vertex(new NodeExp('operator', Expression.operatorsHash['+']));

      this.tree.addEdge(new Edge(root, _2, null, 'uni'));
      this.tree.addEdge(new Edge(root, mul, null, 'uni'));

      this.tree.addEdge(new Edge(mul, _6, null, 'uni'));
      this.tree.addEdge(new Edge(mul, dev, null, 'uni'));

      this.tree.addEdge(new Edge(dev, _7, null, 'uni'));
      this.tree.addEdge(new Edge(dev, plus, null, 'uni'));

      this.tree.addEdge(new Edge(plus, _8, null, 'uni'));
      this.tree.addEdge(new Edge(plus, _9, null, 'uni'));
   }

   private parse() { 
      this._fullStrExp = this._strExp;

      this._root = this._parseNext(this._fullStrExp);
      this._tree.addVertex(this._root);
   }

   private _parseNext(strExp: string, prev?: Vertex<NodeExp>): Vertex<NodeExp> { 
      let pos = 0;

      // Parse First Operand
      let op1End = this.getEndOperandIndex(this.stExp, pos);
      let operand1 = strExp.slice(pos + 1, op1End - 1);
      pos = op1End;

      // It's only operand
      if (pos === strExp.length) { 
         let value = this.toNumber(operand1);
         let newRoot = new Vertex(new NodeExp('operand', value));
         return newRoot;
      }

      // Parse operator
      let operator: Operator;

      console.log(`|${strExp}|`, `|${operand1}|`, `|${strExp[pos]}|`);
      if (strExp[pos] in Expression.operatorsHash) { 
         operator = Expression.operatorsHash[strExp[pos]];
         pos += 1;
      } else {
         throw SyntaxError(`Extected operator at position ${pos}`);
      }

      // Parse Second Operand
      let op2End = this.getEndOperandIndex(this.stExp, pos);
      let operand2 = strExp.slice(pos + 1, op2End - 1);
      pos = op2End;

      // Next Step
      let newRoot = new Vertex(new NodeExp('operator', operator));      
      let left = this._parseNext(operand1, newRoot);
      let right = this._parseNext(operand2, newRoot);

      this._tree.addEdge(new Edge(newRoot, left, null, 'uni'));
      this._tree.addEdge(new Edge(newRoot, right, null, 'uni'));

      if (prev) {
         this._tree.addEdge(new Edge(prev, newRoot, null, 'uni'));
      } 

      return newRoot;
   }

   private toNumber(str: string): number { 
      let res = +str;
      if (isNaN(res)) {
         throw new SyntaxError(`"${str} is not a number"`);
      }

      return res;
   }

   private getEndOperandIndex(strExp: string, pos: number): number { 
      if (strExp[pos] === '(') {
         const close = this.getCloseIndex(strExp, pos + 1);
         if (close === -1) {
            throw new SyntaxError('Unexpected end of input');
         }

         return close + 1;

      } else { 
         let endNumber = this.getEndNumber(strExp, pos);
         if (endNumber === pos) {
            throw SyntaxError(`Extected number at position ${pos}`);
         }

         return endNumber;
      }

   }

   private getEndNumber(strExp: string, pos: number) { 
      for (pos; pos < strExp.length; pos++) { 
         if (strExp[pos] !== '.' && isNaN(+strExp[pos])) return pos;
      }

      return pos;
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
