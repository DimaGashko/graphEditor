import Events from "./events";

/**
 * Template - класс работы с шаблонами
 * 
 * Наследует от Events
 * 
 * **Пример работы**:
 * let tmpl = new Template(`<p><%=name%></p>`);
 * el.innerHTML = tmpl({name: `Jon`});
 * 
 * @argument {string} template строка шаблона
 * 
 * @class 
 */
export default class Template extends Events {
   private tmpl: any;

   constructor(template: string) {
      super();
      this.setTmpl(template);
   }

   /**
    * Возвращает результат шаблона
    * 
    * @param {object} data данные, что нужно подставить в шаблон
    */
   get(data: any): string {
      return this.getTmpl()(data);
   }

   setTmpl(template: string): void {
      this.tmpl = tmpl(template);
   }

   getTmpl() {
      return this.tmpl;
   }
}

// Simple JavaScript Templating
// John Resig - https://johnresig.com/ - MIT Licensed
let tmpl = (function () {
   var cache: any = {};

   return function tmpl(str: string, data?: any) {
      // Figure out if we're getting a template, or if we need to
      // load the template - and be sure to cache the result.
      cache[str] = cache[str] ||
         // Generate a reusable function that will serve as a template
         // generator (and which will be cached).
         new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +

            // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +

            // Convert the template into pure JavaScript
            str
               .replace(/[\r\t\n]/g, " ")
               .split("<%").join("\t")
               .replace(/((^|%>)[^\t]*)'/g, "$1\r")
               .replace(/\t=(.*?)%>/g, "',$1,'")
               .split("\t").join("');")
               .split("%>").join("p.push('")
               .split("\r").join("\\'")
            + "');}return p.join('');");

      // Provide some basic currying to the user
      return data ? cache[str](data) : cache[str];
   };
})();