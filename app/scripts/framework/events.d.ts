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
    private handlers;
    constructor();
    /**
     * Добавляет событие
     * Записывает функцию в массив this._handlers[type]
     * Если такого события еще не было (нет свойства type - добавляет)
     *
     * @param {string} type тип события
     * @param {function} handler фунцкия, которую нужно выполнить
     */
    addEvent(type: string, handler: any): void;
    /**
     * Вызывает переданное событие
     *
     * @param {string} type тип события
     *
     * Все параметры после первого будут переданны во все handler-ы
     */
    trigger(type: string, ...parametrs: any[]): void;
}
//# sourceMappingURL=events.d.ts.map