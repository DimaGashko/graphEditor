import Vertex from "./vertex";
import Edge from "./edge";

//Вспомогательная информация о вершинах
interface IVerticesLog<ETarget, VTarget> { 
   [vertextId: number]: {
      //Ребра через которые можно пройти с данной вершины
      edges: Edge<ETarget, VTarget>[],
   },
}

//Вспомогательная информация о ребрах
interface IEdgesLog<ETarget, VTarget> { 
   [edgeId: number]: {},
}

/**
 * Представление графа
 * 
 * Испльзование:
 *
 * const graph: Graph = new Graph<Number, Number>();
 *
 * const v1 = new Vertex<Number>(1);
 * const v2 = new Vertex<Number>(2);
 * 
 * const e1 = new Edge<Number, Number>(v1, v2, 1, 'uni');
 * graph.addEdge(e1);
 * 
 * Получим граф вида:
 * (0) ---> (1)
 * 
 * uni - одно-направленное ребро
 * bi - двунаправленное
 * 
 * p.s. Что бы обеспечить нужный порядок вершин их нужно 
 * добавить перед добавлением ребер:
 * 
 * graph.addVertex(v0);
 * graph.addVertex(v1);
 * graph.addEdge(e1);
 * 
 * @class
 */

export default class Graph<ETarget, VTarget> {
   private vertices: Vertex<VTarget>[] = [];
   private edges: Edge<ETarget, VTarget>[] = [];

   private verticesLog: IVerticesLog<ETarget, VTarget> = {};
   private edgesLog: IEdgesLog<ETarget, VTarget>

   /**
    * Возвращает копию(!) массива вершин
    */
   public getVertices(): Vertex<VTarget>[] {
      return this.vertices.slice();
   }

   /**
    * Возвращает копию(!) массива ребер
    */
   public getEdges(): Edge<ETarget, VTarget>[] {
      return this.edges.slice();
   }

   constructor(vertices?: Vertex<VTarget>[], edges?: Edge<ETarget, VTarget>[]) {
      if (vertices) this.addAllVertices(vertices);
      if (edges) this.addAllEdges(edges);
   }

   /**
    * Добавляет в граф массив вершин
    * @param vertices Вершини
    */
   public addAllVertices(vertices: Vertex<VTarget>[]) { 
      vertices.forEach(vertex => this.addVertex(vertex));
   }

   /**
    * Добавляет в граф массив ребер
    * @param Edges Ребра
    */
   public addAllEdges(edges: Edge<ETarget, VTarget>[]) { 
      edges.forEach(edge => this.addEdge(edge));
   }

   /**
    * Добавляет в граф вершину
    * @param vertex вершина
    */
   public addVertex(vertex: Vertex<VTarget>) { 
      if (this.containsVertex(vertex)) return;

      this.vertices.push(vertex);
      this.verticesLog[vertex.id] = {
         edges: [],
      }
   }

   /**
    * Добавляет в граф ребро
    * Если вершини ребра не доповлены в граф, то они добавляются
    * @param edge Ребро
    */
   public addEdge(edge: Edge<ETarget, VTarget>) { 
      if (this.containsEdge(edge)) return;

      this.edges.push(edge);
      this.edgesLog[edge.id] = {};

      this.addVertex(edge.v1);
      this.addVertex(edge.v2);
    
      this.addEdgeToVertecisLog(edge);
   }

   //Добавляет информацию о ребре в verticesLog его вершин
   //Если вершины не добавлены в граф, они добавляются
   private addEdgeToVertecisLog(edge: Edge<ETarget, VTarget>) { 
      //Check
      if (!this.containsVertex(edge.v1)) { 
         this.addVertex(edge.v1);
      }

      if (!this.containsVertex(edge.v2)) {
         this.addVertex(edge.v2);
      }

      //Add
      const v1Edges = this.verticesLog[edge.v1.id].edges;
      const v2Edges = this.verticesLog[edge.v2.id].edges;

      if (!v1Edges.some(e => e === edge)) {
         v1Edges.push(edge);
      }

      if (edge.type === "bi" && !v2Edges.some(e => e === edge)) {
         v2Edges.push(edge);
      }
   }

   /**
    * Проверяет содержит ли граф вершину
    * @param vertex проверяемая вершина
    * @returns содержит ли граф вершину
    */
   public containsVertex(vertex: Vertex<VTarget>): boolean { 
      return vertex.id in this.verticesLog;
   }

   /**
    * Проверяет содержит ли граф ребро
    * @param edge проверяемое ребро
    * @returns содержит ли граф ребро
    */
   public containsEdge(edge: Edge<ETarget, VTarget>): boolean { 
      return edge.id in this.edgesLog;
   }

}


   /**
    * Возвращает граф в виде матрицы смежности
    * Если в графе есть кратные ребра, то они "склеиваются"
    * (Кратные ребра остаются, если они имеют разные направление)
    */
   /*public toAdjacencyMatrix(): number[][] { 
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
   }*/

   /**
    * Возвращает граф в виде матрицы инцидентности
    * 
    * Ряды матрицы представляют ребра, столбцы - вершины
    * Вес ребер игнорируется 
    */
   /*public toIncidenceMatrix(): number[][] { 
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
   */

   /**
    * На основании переданной матрицы смежности возвращает граф
    * 
    * @param {number[][]} matrix матрица смежности
    * @returns Graph
    */
   /*static parseAdjacencyMatrix(matrix: number[][]): Graph { 
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
*/
   /**
    * На основании переданной матрицы инцидентности возвращает граф
    * 
    * @param {number[][]} matrix матрица смежности
    * @returns Graph
    */
  /* static parseIncidenceMatrix(matrix: number[][]): Graph { 
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
*/
   /**
    * Проверяет, являются ли переданные ребра кратными
    * 
    * @param e1 первое ребро
    * @param e2 второе ребро
    */
  /* static isMultipleEdges(e1: Edge, e2: Edge): boolean { 
      return (
         (e1.v1 === e2.v1 && e1.v2 === e2.v2) ||
         (e1.v1 === e2.v2 && e1.v2 === e2.v1)
      );
   }

}*/

