import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {

  url='http://localhost:4000/api/'

  constructor(private http: HttpClient) {}

  getAll(endPoint:String): Observable<any>{
    return this.http.get(this.url+endPoint+'/');
  }

  getAllWithParams(endPoint:String,params:any):Observable<any>{
    
    return this.http.get(this.url+endPoint+'/',{ params })
  }

  getFile(endPoint:String):Observable<any>{
    return this.http.get(this.url+endPoint+'/', { responseType: 'blob' });
  }

  get(endPoint:String,id:string): Observable<any>{
    return this.http.get(this.url+endPoint+'/'+id);
  }
  save(model:any,endPoint:string):Observable<any>{
    return this.http.post(this.url+endPoint+'/',model);
  }
  update(model:any,endPoint:string,id:string):Observable<any>{
    return this.http.put(this.url+endPoint+'/'+id,model)
  }
  updateWithoutId(model:any,endPoint:string):Observable<any>{
    return this.http.put(this.url+endPoint+'/',model)
  }
  delete(id:string,endPoint:string):Observable<any>{
    return this.http.delete(this.url+endPoint+'/'+id)
  }
}
