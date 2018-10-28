/**
    * Класс для работы с векторами
    * 
    * @class
    * 
    * Аргументами конструктора являются координаты x, y вектора
    * По умолчанию координаты равны 0:0
    * 
    * Все методы возвращают новый вектор
    */
export default class Vector {
   public x: number = 0;
   public y: number = 0;
  
   constructor(x: number = 0, y: number = 0) {
      this.x = x;
      this.y = y;
   }

   /**
    * Добавляет вектор
    * 
    * @param {Vector} vector вектор, который будет добавлен
    */
   add(vector: Vector): Vector {
      return new Vector(
         this.x + vector.x,
         this.y + vector.y
      );
   }

   /**
    * Вычитает векторы
    * 
    * @param {Vector} vector вектор, который будет вычтен
    */
   sub(vector: Vector): Vector {
      return new Vector(
         this.x - vector.x,
         this.y - vector.y
      );
   }

   /**
    * Умножает координаты вектора на переданное число
    * 
    * @param {number} n число, на которое будут умножены 
    * координаты вектора
    */
   mul(n: number): Vector {
      return new Vector(
         this.x * n,
         this.y * n
      );
   }

   /**
    * Делит координаты вектора на переданное число
    * 
    * @param {number} n число, на которое будут поделены 
    * координаты вектора
    */
   div(n: number): Vector {
      return new Vector(
         this.x / n,
         this.y / n
      );
   }

   /**
    * Умножает координаты вектора на соответствующие координаты
    * переданного вектора 
    * 
    * @param {Vector} vector вектор, на который будет происходить умножение
    */
   scale(scale: Vector): Vector {
      return new Vector(
         this.x * scale.x,
         this.y * scale.y,
      );
   }

   /**
    * Делит координаты вектора на соответствующие 
    * координаты переданного вектора
    * 
    * @param {Vector} scale вектор, на которой будет происходить деление
    */
   diScale(scale: Vector): Vector {
      return new Vector(
         this.x / scale.x,
         this.y / scale.y,
      );
   }

   /**
    * Копирует вектор
    */
   copy(): Vector {
      return new Vector(
         this.x,
         this.y
      );
   }

}