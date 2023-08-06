export class User {
    _id?: number;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    status?:boolean;
  
    constructor(email: string, firstName:string="",lastName:string="", password: string) {
      this.email=email;
      this.firstName = firstName;
      this.lastName = lastName;
      this.password = password;
    }
  }