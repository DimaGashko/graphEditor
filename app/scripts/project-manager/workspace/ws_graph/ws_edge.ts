interface IEdgeStyle { 
   lineColor: string,
   lineWidth: number,
   fontFamily: string,
   fontVariant: string,
   fontSize: number,
}

export default class WSEdge {

   public style: IEdgeStyle = {
      lineColor: '#000',
      lineWidth: 2,
      fontFamily: 'Arial',
      fontSize: 14,
      fontVariant: 'normal',
   }

   constructor(public name: string = 'e') { 
      
   }
}