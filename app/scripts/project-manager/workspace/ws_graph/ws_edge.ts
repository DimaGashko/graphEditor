interface IEdgeStyle { 
   lineColor: string,
   lineWidth: number,
   fontFamily: string,
   fontVariant: string,
   fontSize: number,
   color: string,
}

export default class WSEdge {
   public arrowSize: number = 15;

   public style: IEdgeStyle = {
      lineColor: '#000',
      lineWidth: 2,
      fontFamily: 'Arial',
      fontSize: 14,
      fontVariant: 'normal',
      color: '#000',
   }

   constructor(public name: string = 'e') { 
      
   }
}