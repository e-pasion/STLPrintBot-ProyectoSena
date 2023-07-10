export class Color {
    _id?: number;
    name: string;
    code: string;
    status: boolean;
  
    constructor(name: string, code:string, status: boolean) {
      this.name=name;
      this.code = code;
      this.status = status;
    }
  }