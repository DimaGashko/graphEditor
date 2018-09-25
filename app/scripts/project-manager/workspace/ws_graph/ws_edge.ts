interface IEdgeStyle { 
   lineWidth: number,
   fontFamily: string,
   fontVariant: string,
   fontSize: number,
   color: string,

   loopWidth: number,
   loopFontSize: number,
}

export default class WSEdge {
   public arrowSize: number = 15;

   public style: IEdgeStyle = {
      lineWidth: 2,
      fontFamily: 'Arial',
      fontSize: 14,
      fontVariant: 'normal',
      color: '#000',

      loopWidth: 1,
      loopFontSize: 10
   }

   constructor(public name: string = 'e') { 
      
   }

}