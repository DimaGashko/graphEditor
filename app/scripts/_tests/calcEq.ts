import Expression from "../modelComponents/Expression";

const global = (<any>window);

export default function demoCalcEq() {
   global.Expression = Expression;

   global.setExp = ((exp: Expression) => { 
      setExp(exp);
      global.exp = exp;
   });
}

function setExp(exp: Expression) { 
   
}