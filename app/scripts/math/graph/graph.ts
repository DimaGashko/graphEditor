import Vertex from "./vertex";
import Edge from "./edge";

/**
 * Представление графа и алгоритмы на графе
 * 
 * @class
 */
export default class Graph { 
   private vertices: Vertex[] = [];
   private edges: Edge[] = [];

   constructor() { 

   }

   public addVertex(vertex: Vertex): void { 
      if (this.vertices.indexOf(vertex) !== -1) return;

      this.vertices.push(vertex);
   }

   public addEdge(edge: Edge): void { 
      if (this.edges.indexOf(edge) !== -1) return;

      this.edges.push(edge);

      this.addVertex(edge.v1);
      this.addVertex(edge.v2);
   }

   /**
    * Возвращает граф в виде матрицы смежности
    */
   public toAdjacencyMatrix(): number[][] { 
      let matrix: number[][] = [];
      this.vertices.forEach(() => { 
         matrix.push(new Array(this.vertices.length).fill(0));
      });

      this.edges.forEach((edge) => { 
         let v1 = this.vertices.indexOf(edge.v1);
         let v2 = this.vertices.indexOf(edge.v2);
         if (v1 === -1 || v2 === -1) return;

         if (v1 === v2) {
            matrix[v1][v2] += edge.weight;

         } else {
            matrix[v1][v2] += edge.weight;

            if (edge.type === "bi") {
               matrix[v2][v1] += edge.weight;
            }
         }
      });

      return matrix;
   }

   /**
    * Возвращает граф в виде матрицы инцидентности
    */
   public toIncidenceMatrix(): number[][] { 
      return [[]];
   }

   static parseAdjacencyMatrix(matrix: number[][]): Graph { 
      let graph = new Graph();
      let vertices: Vertex[] = [];

      let len = matrix.length;

      //Создаем вершины
      //Добавляем их в граф сразу (что бы сохранить последовательность)
      //Сохраняет их в массиве, что бы иметь быстрый доступ по индексу
      for (let i = 0; i < len; i++) {
         let vertex = new Vertex();
         vertices.push(vertex);
         graph.addVertex(vertex);
      }

      for (let i = 0; i < len; i++) {
         for (let j = 0; j < len; j++) { 
            //Нет ребра
            if (matrix[i][j] === 0) continue;

            //Ориентированное ребро
            if (matrix[i][j] !== matrix[j][i]) { 
               graph.addEdge(
                  new Edge(vertices[i], vertices[j], 'uni', matrix[i][j])
               );
            
            //Не ориентированное ребро
            } else {
               //не ориентированные ребра добавляем только в одной половине матрицы
               if (i < j) continue; 

               graph.addEdge(
                  new Edge(vertices[i], vertices[j], 'bi', matrix[i][j])
               );
            }

         }
      }

      return graph;
   }

}