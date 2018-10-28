import Vertex from "./vertex";
import Edge from "./edge";

/**
 * Представление графа
 * 
 * Испльзование:
 *
 * let graph: Graph = new Graph();
 *
 * let v0 = new Vertex(0);
 * let v1 = new Vertex(1);
 * 
 * let e0 = new Edge(v0, v1, 'uni', 1);
 * 
 * graph.addVertex(v0);
 * graph.addVertex(v1);
 * 
 * graph.addEdge(e1);
 * 
 * Получим граф вида:
 * (0) ---> (1)
 * 
 * uni - одно-направленное ребро
 * bi - двунаправленное
 * 
 * p.s.при добавлении ребра, его вершины автоматически добавляются в граф, 
 * поэтому писать addVertex для вершин, которые указываются в 
 * ребрах - не обязательно (их можно передавать до добавления 
 * ребер, что бы сохранить последовательность)
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

   public getVertices(): Vertex[] { 
      return this.vertices.slice();
   }

   public getEdges(): Edge[] { 
      return this.edges.slice();
   }

   /**
    * Возвращает граф в виде матрицы смежности
    * Если в графе есть кратные ребра, то они "склеиваются"
    * (Кратные ребра остаются, если они имеют разные направление)
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
            matrix[v1][v2] += 1

         } else {
            matrix[v1][v2] += 1

            if (edge.type === "bi") {
               matrix[v2][v1] += 1
            }
         }
      });

      return matrix;
   }

   /**
    * Возвращает граф в виде матрицы инцидентности
    * 
    * Ряды матрицы представляют ребра, столбцы - вершины
    * Вес ребер игнорируется 
    */
   public toIncidenceMatrix(): number[][] { 
      let matrix: number[][] = [];

      this.edges.forEach((edge, i) => { 
         matrix[i] = new Array(this.vertices.length).fill(0);

         let v1 = this.vertices.indexOf(edge.v1);
         let v2 = this.vertices.indexOf(edge.v2);
         if (v1 === -1 || v2 === -1) return;

         if (v1 === v2) {
            matrix[i][v1] += 2;

         } else {
            matrix[i][v1] = (edge.type === "bi") ? 1 : -1;
            matrix[i][v2] = 1;
         }
      });

      return matrix;
   }

   /**
    * На основании переданной матрицы смежности возвращает граф
    * 
    * @param {number[][]} matrix матрица смежности
    * @returns Graph
    */
   static parseAdjacencyMatrix(matrix: number[][]): Graph { 
      let graph = new Graph();
      let vertices: Vertex[] = [];

      let len = matrix.length;

      //Создаем вершины
      //Добавляем их в граф сразу (что бы сохранить последовательность)
      //Сохраняем их в массиве, что бы иметь быстрый доступ по индексу
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

   /**
    * На основании переданной матрицы инцидентности возвращает граф
    * 
    * @param {number[][]} matrix матрица смежности
    * @returns Graph
    */
   static parseIncidenceMatrix(matrix: number[][]): Graph { 
      if (!matrix.length) return new Graph();

      let graph = new Graph();
      let vertices: Vertex[] = [];

      let verticesLen = matrix[0].length;
      let edgesLen = matrix.length;

      //Cоздаем все вершины и добавляем их в граф
      //Что бы их последовательность была правильной, 
      //Добавть их нужно перед добавлением ребер
      for (let i = 0; i < verticesLen; i++) { 
         let v: Vertex = new Vertex();
         vertices.push(v);
         graph.addVertex(v);
      }

      for (let i = 0; i < edgesLen; i++) {
         let incidence: {val: number, index: number}[] = [];

         matrix[i].forEach((val, i) => { 
            if (val === 0) return;
            incidence.push({val: val, index: i});
         });

         if (incidence.length === 0) continue;

         else if (incidence.length === 1) {
            //Петля
            let v = vertices[incidence[0].index];
            graph.addEdge(new Edge(v, v));

         } else { 
            let v1 = vertices[incidence[0].index];
            let v2 = vertices[incidence[1].index];

            if (incidence[0].val === incidence[1].val) {
               graph.addEdge(new Edge(v1, v2, 'bi'));
            
            } else if (incidence[0].val < 0) {
               graph.addEdge(new Edge(v1, v2, 'uni'));

            } else { 
               graph.addEdge(new Edge(v2, v1, 'uni'));
            }

         }
      }

      return graph;
   }

   /**
    * Проверяет, являются ли переданные ребра кратными
    * 
    * @param e1 первое ребро
    * @param e2 второе ребро
    */
   static isMultipleEdges(e1: Edge, e2: Edge): boolean { 
      return (
         (e1.v1 === e2.v1 && e1.v2 === e2.v2) ||
         (e1.v1 === e2.v2 && e1.v2 === e2.v1)
      );
   }

}