export class User {
    _id?: number;
    fullName: string;
    email: string;
    password: string;
  
    constructor(email: string, fullName:string="", password: string) {
      this.email=email;
      this.fullName = fullName;
      this.password = password;
    }
  }