interface IEdgeStyle { 
   lineColor: string,
   lineWidth: number,
   font: string,
}

export default class WSEdge {

   public style: IEdgeStyle = {
      lineColor: '#000',
      lineWidth: 2,
      font: '14px Arial',
   }

   constructor(public name: string = 'e') { 
      
   }
}