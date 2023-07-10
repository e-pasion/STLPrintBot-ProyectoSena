import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { dataURLtoFile } from '../../utils/file'
declare const StlViewer:any;


@Injectable({
  providedIn: 'root'
})
export class StlServiceService {
  defaultColor:string="#2196f3";
  url='http://localhost:4000/api/'

  constructor(private http: HttpClient) {}

  cotization(file:any,fill:number):Observable<any>{
    const formData = new FormData();
      formData.append('stl', file);
      formData.append('fill', fill.toString());
    return this.http.post(this.url+'calculator/cotization/',formData);
  }

  takePhoto(dataUrl:string){
    return dataURLtoFile(dataUrl,"img.png");
  }

  purchaseStl(file:any,fill:number,dataUrl:string,colorCode:string):Observable<any>{
    console.log(dataUrl);
    const img=this.takePhoto(dataUrl);
    console.log(img);
    const formData = new FormData();
    formData.append('dataFiles', img);
    formData.append('dataFiles', file);
    formData.append('fill', fill.toString());
    formData.append('colorCode',colorCode)
    return this.http.post(this.url+'calculator/',formData);
  }


}
