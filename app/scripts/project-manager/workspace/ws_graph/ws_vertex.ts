import Vector from "../../../math/vector/vector";

interface IVertextStyle { 
   background: string;
   borderWidth: number;
   borderColor: string;
   fontFamily: string,
   fontVariant: string,
   fontSize: number,
   lineColor: string,
   color: string;
}

export default class WSVertex { 
   public radius: Vector = new Vector(20, 20);

   constructor(
      public name: string = 'v',
      public coords: Vector = new Vector()
   ) {

   }

   public style: IVertextStyle = {
      background: '#fff',
      borderWidth: 2, 
      borderColor: '#000',
      fontFamily: 'Arial',
      fontSize: 14,
      fontVariant: 'normal',
      lineColor: '#000',
      color: '#000',
   }
}