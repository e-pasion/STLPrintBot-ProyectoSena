import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarServiceService {
  isCartOpen:boolean=false;
  isBgBlur:boolean=false;

  constructor() { }

  toggleCart(){
    this.isCartOpen=!this.isCartOpen;
  }
  getCartStatus(){
    return this.isCartOpen;
  }

  toggleBgBlur(){
    this.isBgBlur=!this.isBgBlur;
  }
  getBgBlurStatus(){
    return this.isBgBlur;
  }
}
