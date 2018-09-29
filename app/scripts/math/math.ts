import Vector from "./vector/vector";

export function getBezieCoords(p1: Vector, p2: Vector, p3: Vector, t: number) {
   return new Vector((1 - t) * (1 - t), (1 - t) * (1 - t)).scale(p1)
      .add(new Vector(2 * (1 - t) * t, 2 * (1 - t) * t).scale(p2))
      .add(new Vector(t * t, t * t).scale(p3));
}

export function getRandomInt(min: number, max: number) {
   return Math.round(Math.random() * (max - min) + min);
}

export function getRandomVector(min: number, max: number) {
   return new Vector(
      getRandomInt(min, max),
      getRandomInt(min, max),
   );
}