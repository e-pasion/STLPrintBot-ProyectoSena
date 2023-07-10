import { Color } from "./Color";

export class Product {
    _id?: string;
    pathImage: string;
    pathFile: string;
    weigth: number;
    fill:number;
    sizeX:number;
    sizeY:number;
    sizeZ:number;
    color:Color;
    quantity:number;
  
    constructor( pathImage: string,pathFile: string,weigth: number,fill:number,sizeX:number,sizeY:number,sizeZ:number,color:Color,quantity:number=1) {
      this.pathImage=pathImage;
      this.pathFile = pathFile;
      this.weigth = weigth;
      this.fill=fill;
      this.sizeX = sizeX;
      this.sizeY = sizeY;
      this.sizeZ=sizeZ;
      this.color=color;
      this.quantity=quantity  
    }
  }