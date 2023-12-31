import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  constructor(private http: HttpClient) { }

  dataURLtoFile=(dataUrl:string, fileName:string)=>{
 
    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
}

fixPath=(path:string,type:string)=>{
  let fixedpath=path.replace('src\\', '');
  fixedpath.replace(/\\/g, '/'); //expresion regular para cambiar todas las barras invertidas por barras normales
  fixedpath.split(' ').join('%20');;//expresion regular que reemplaza los espacios vacios para que no haya errores
  return (`http://localhost:4000/api/${fixedpath}`);
}

  validateSTL=(file:File)=>{
    const fileSizeMB = file.size / (1024 * 1024);//encuentra las megas que tiene el archivo
    const extensionIndex=file.name.lastIndexOf(".");
    const extensionFile=file.name.substring(extensionIndex+1);
    if(extensionFile.toLowerCase()!=="stl" || fileSizeMB>20){
      return false;
    }
    return true;
  }

  generatePDF(id: any): Observable<ArrayBuffer> {
    return this.http.get(`http://localhost:4000/api/calculator/pdf/${id}`, { responseType: 'arraybuffer' });
  }
}


