interface IEdgeStyle { 
   lineWidth: number,
   fontFamily: string,
   fontVariant: string,
   fontSize: number,
   lineColor: string,
   color: string,
   arrowSize: number
   loopArrowSize: number
   loopWidth: number,
   loopFontSize: number,
}

export default class WSEdge {
   public = 15;
   
   constructor(public name: string = 'e') { 
      
   }

   public style: IEdgeStyle = {
      lineWidth: 2,
      fontFamily: '"Arial Black", Gadget, sans-serif',
      fontSize: 14,
      fontVariant: 'normal',
      color: '#000',
      lineColor: '#000',
      arrowSize: 10,
      loopArrowSize: 10,
      loopWidth: 1.5,
      loopFontSize: 12
   }

}