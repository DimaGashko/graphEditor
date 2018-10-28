/**
 * Вершина графа
 * При инициализации получает Target - данные вершины. Это может быть как 
 * просто число, либо строка, так и любой объект:
 * 
 * new Vertex<number>(10);
 * new Vertex<string>("v1");
 * 
 * @class
 */
export default class Vertex<Target> {
   public get targ(): Target {
      return this._targ;
   }

   constructor(private _targ: Target) { 
      
   }
}  