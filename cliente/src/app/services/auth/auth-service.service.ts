import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  // url='http://localhost:4000/api/auth/'
  url='https://stlprintbotbackend.onrender.com/api/auth';


  constructor(private http:HttpClient,public router:Router) { }

  signUp(user:User):Observable<any>{
    console.log(user)
    return this.http.post(this.url+'register',user);
  }
  signUpEmployee(user:User):Observable<any>{
    console.log(user)
    return this.http.post(this.url+'register-employee',user);
  }


  signIn(user:User):Observable<any>{
    return this.http.post(this.url+'login',user)
  }


  getToken() {
    const value = "; " + document.cookie;
    const parts = value.split("; " + 'token' + "=");
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift();
    }
    return "";
  }


  getUserRoles(){
    const token = this.getToken();  
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userRoles = decodedToken.roles;
      return userRoles;
    }
    return [];
  }

  getUserName(){
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const name = decodedToken.name;
      return name;
    }
    return [];
  }

  isClient(){
    const roles=this.getUserRoles();
    return roles.includes('client');
  }

  isEmployee(){
    const roles=this.getUserRoles();
    return roles.includes('employee');
  }

  isAdmin(){
    const roles=this.getUserRoles();
    console.log(roles);
    return roles.includes('admin');
  }

  isLoggedIn(): boolean {
    let authToken = this.getToken();
    return authToken !== null ? true : false;
  }
  
  doLogout():Observable<any> {
    return this.http.post(this.url+'logout',{});
  }
}
