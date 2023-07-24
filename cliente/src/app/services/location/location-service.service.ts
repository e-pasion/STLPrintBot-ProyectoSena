import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {

  private jsonURL = 'assets/colombia.json'; // Ruta al archivo JSON en la carpeta assets

  constructor(private http: HttpClient) {}

  getDepartments() {
    return this.http.get<any>(this.jsonURL);
  }
}
