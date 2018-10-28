import Vertex from "./vertex";

//Идинтификатор для следующего экземпляра
let curId = 0;

/**
 * Ребро графа
 * 
 * Пример использования:
 * 
  ``
  const v1 = new Vertex<Number>(1);
  const v2 = new Vertex<Number>(2);
  
  const e1 = new Edge<Number, Number>(v1, v2, 1, 'bi'),
  ```
 * 
 * Где <Number, Number> - соответственно типы представления ребра и его вершин
 * 
 * Класс иммутабельный
 * 
 * @class
 */
export default class Edge<Target, VTarget> {
   //Каждое ребро имеет уникальное id
   public readonly id = curId++;
   
   /**
    * @param v1 Первая вершина 
    * @param v2 Вторая вершина 
    * @param targ Представление ребра
    * @param type Тип ребра
    */
   constructor(
      public readonly v1: Vertex<VTarget>,
      public readonly v2: Vertex<VTarget>,
      public readonly targ: Target,
      public readonly type: 'uni' | 'bi' = 'bi'
   ) { 
      if (!v1 || !v2) { 
         throw "v1 or v2 is not a Vertex";
      }

   }
   
}