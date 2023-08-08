export class Code {
    _id?: number;
    code: string;
    startDate:Date;
    finalDate:Date;
    status?: boolean;
  
    constructor(code:string,startDate:Date,finalDate:Date) {
      this.startDate= startDate;
      this.finalDate=finalDate;
      this.code = code;
    }
  }