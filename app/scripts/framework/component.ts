import Events from "./events";

export default class Component extends Events {
   protected els: { [elem: string]: HTMLElement } = {}; //HTML-elements

   constructor() { 
      super();
   }
   
}