import Edge from "../edge";

/**
 * Проверяет являются ли переданные ребра кратными
 * @param e1 первое ребро
 * @param e2 второе ребро
 * @returns являются ли переданные ребра кратными
 */
export default function isMultipleEdges<E, V>(e1: Edge<E, V>, e2: Edge<E, V>): boolean {
   return (
      (e1.v1 === e2.v1 && e1.v2 === e2.v2) ||
      (e1.v1 === e2.v2 && e1.v2 === e2.v1)
   );
}
