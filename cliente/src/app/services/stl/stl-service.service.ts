import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileServiceService } from '../file/file-service.service';
declare const StlViewer:any;


@Injectable({
  providedIn: 'root'
})
export class StlServiceService {
  defaultColor:string="#2196f3";
  url='http://localhost:4000/api/'
  // url='https://stlprintbotbackend.onrender.com/api/';


  constructor(private http: HttpClient,private fileService:FileServiceService) {}

  cotization(volume:number,fill:number):Observable<any>{
    return this.http.post(this.url+'calculator/cotization/',{
      volume,
      fill
    },{withCredentials:true});
  }

  takePhoto(dataUrl:string){
    return this.fileService.dataURLtoFile(dataUrl,"img.png");
  }


  getMaxScale(STLDims:any){
    let {x,y,z}=STLDims;
    return (Math.min(220/x,250/y,220/z))*100;
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
