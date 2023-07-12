import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarServiceService {
  isCartOpen:boolean=false;

  constructor() { }

  toggleCart(){
    this.isCartOpen=!this.isCartOpen;
  }
  getCartStatus(){
    return this.isCartOpen;
  }
}
