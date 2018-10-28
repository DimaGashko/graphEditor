//Идинтификатор для следующего экземпляра
let curId = 0;

/**
 * Вершина графа
 * 
 * При инициализации получает тип представления вершины. Это может быть как 
 * просто число, либо строка, так и любой объект:
 * 
  ```
  new Vertex<number>(10);
  new Vertex<string>("v1");
  ```
 * 
 * Класс иммутабельный
 * 
 * @class
 */
export default class Vertex<Target> {
   //Каждая вершина имеет уникальное id
   public readonly id = curId++;

   /**
    * @param targ Представление вершины
    */
   constructor(public readonly targ: Target) { 
      
   }
}  