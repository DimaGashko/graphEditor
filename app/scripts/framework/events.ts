/**
 * Работа с события
 * 
 * Использование:
 * 1. Можно задавать явно:
 * 
 * var events = new Events();
 * events.addEvent('eventName', () => {
 *    console.log('ok');
 * })
 * event.trigger('eventName');
 * 
 * 2. Также можно наследовать от Events в своих классах:
 * 
 * class A extends Events {...}
 * 
 * В таком случае класс А будет обретать все возможности Events
 * 
 * var a = new A();
 * a.addEvent('eventName', () => {
 *    console.log('ok');
 * })
 * a.trigger('eventName');
 * 
 * @class
 * 
*/
export default class Events {
   //Хранит все вызываемые функции при наступлении событий
   //Все хранятся в свойстве с названием события
   //Функции хранятся в массиве
   //Например: {load: [f1, f2, f3]}
   private handlers: any = {};

   constructor() {         
      
   }
   
   /**
    * Добавляет событие
    * Записывает функцию в массив this._handlers[type]
    * Если такого события еще не было (нет свойства type - добавляет)
    * 
    * @param {string} type тип события
    * @param {function} handler фунцкия, которую нужно выполнить
    */
   addEvent(type: string, handler: any) { 
      this.handlers[type] = this.handlers[type] || [];
      this.handlers[type].push(handler);
   }

   /**
    * Вызывает переданное событие
    * 
    * @param {string} type тип события
    * 
    * Все параметры после первого будут переданны во все handler-ы
    */
   trigger(type: string/*[, parametrs]*/) { 
      //На такое событие не подписывались
      if (!this.handlers[type]) return;

      var args = (<any>Array).from(arguments).slice(1);
      
      this.handlers[type].forEach((handler: any) => { 
         handler.apply(null, args);
      });
   }
}