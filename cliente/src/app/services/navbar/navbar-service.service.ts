import { Injectable } from '@angular/core';
import { CrudServiceService } from '../crud/crud-service.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarServiceService {
  isCartOpen:boolean=false;
  userInCheckout:boolean=false;
  cartLength=0;
  constructor(private crudService: CrudServiceService) {
    this.getCartLength();
  }

  

  toggleCart(){
    this.isCartOpen=!this.isCartOpen;
  }
  getCartStatus(){
    return this.isCartOpen;
  }

  getCartLength(){
    this.crudService.getAll('cart/length').subscribe({
      next:(data)=>{
        this.cartLength=data.length;
        console.log(this.cartLength);
      },
      error:(e)=>{
        this.cartLength=0;
      }
    })
  }

  updateCartLength(cant:any){
    this.cartLength+=cant;
  }

}
