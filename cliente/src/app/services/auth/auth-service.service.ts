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
  url='http://localhost:4000/api/auth/'

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

  setToken(token:string){
    localStorage.setItem('access_token',token);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  getUserId(){
    const token = this.getToken();
  
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userId = decodedToken.id; // Asegúrate de que 'rol' coincida con el nombre de la reclamación en tu token
      return userId;
    }
    return "";
  }

  getUserRoles(){
    const token = this.getToken();
  
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userRoles = decodedToken.roles; // Asegúrate de que 'rol' coincida con el nombre de la reclamación en tu token
      return userRoles;
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
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  
  doLogout() {
    localStorage.removeItem('access_token');
  }
}
