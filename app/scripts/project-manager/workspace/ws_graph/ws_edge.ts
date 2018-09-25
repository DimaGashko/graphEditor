interface IEdgeStyle { 
   lineWidth: number,
   fontFamily: string,
   fontVariant: string,
   fontSize: number,
   color: string,
   arrowSize: number

   loopArrowSize: number
   loopWidth: number,
   loopFontSize: number,
}

export default class WSEdge {
   public  = 15;

   public style: IEdgeStyle = {
      lineWidth: 2,
      fontFamily: 'Arial',
      fontSize: 14,
      fontVariant: 'normal',
      color: '#000',
      arrowSize: 10,

      loopArrowSize: 10,
      loopWidth: 1,
      loopFontSize: 12
   }

   constructor(public name: string = 'e') { 
      
   }

}