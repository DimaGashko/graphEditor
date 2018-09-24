import Vector from "../../../math/vector/vector";

export default class WSVertex { 

   constructor(
      public name: string = 'v',
      public coords: Vector = new Vector()
   ) {

   }
}