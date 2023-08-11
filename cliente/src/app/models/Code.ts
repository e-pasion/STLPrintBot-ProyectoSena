export class Code {
    _id?: number;
    code: string;
    finalDate:Date;
    discount:number;
    status?: boolean;
  
    constructor(code:string,discount:number,finalDate:Date) {
      this.discount= discount;
      this.finalDate=finalDate;
      this.code = code;
    }
  }