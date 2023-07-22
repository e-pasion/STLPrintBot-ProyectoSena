import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { CrudServiceService } from 'src/app/services/crud/crud-service.service';
import { FileServiceService } from 'src/app/services/file/file-service.service';
import { NavbarServiceService } from 'src/app/services/navbar/navbar-service.service';
import { changeWidth0To1002 } from 'src/app/utils/animation';

@Component({
  selector: 'app-test-cart',
  templateUrl: './test-cart.component.html',
  styleUrls: ['./test-cart.component.css'],
  animations:[changeWidth0To1002]  

})
export class TestCartComponent {

  constructor(private navbarService:NavbarServiceService,private crudService:CrudServiceService, private fileService:FileServiceService,private authService:AuthServiceService, private router:Router) { 
  }

  products:Product[]=[]
  totalPrice:number=0;
  toCheckout:boolean=false;//variable creada para que si es true, cuando termine la animacion cambie la pagina a checkout

  ngOnInit(): void {
    if(this.authService.isClient()){
    this.findProducts();
    }
    
  }

  calculatePrice(weigth:number,quantity:number){
    return ((weigth*quantity*80000)/1000).toFixed(0)

  }

  closeCart(){
    this.navbarService.toggleCart()
  }
  isCartOpen(){
    return this.navbarService.getCartStatus()
  }

  increaseQuantity(index:number){
    this.updateQuantity(index,1);
    this.products[index].quantity++;
  }
  decreaseQuantity(index:number){
    this.updateQuantity(index,-1);
    if(this.products[index].quantity>1)
    this.products[index].quantity--;
  }

  updateQuantity(index:number,increment:number){
    let quantity={quantity:this.products[index].quantity+increment};//se incrementa o decrementa la cantidad
    this.crudService.update(quantity,"calculator/quantity",this.products[index]._id!)//el ! es para saltarse el error por ser undefined
    .subscribe({
      next:(data)=>{
        quantity=data;
      }
    })

    this.findTotalPrice()
  }

  fixImg(path:string){
    return this.fileService.fixPath(path,"img")
  }


  findProducts(){
    this.crudService.getAll('cart/').subscribe({
      next:(data)=>{
        console.log(data);
        this.products=data;
      },
      error:(e)=>{
        console.log(e);
      },
      complete:()=>{
        this.findTotalPrice();
      }
    })
  }

  findTotalPrice(){
    this.crudService.getAll('cart/price').subscribe({
      next:(data)=>{
        console.log(data);
        this.totalPrice=data;
      },
      error:(e)=>{
        console.log(e);
      }    
    })
  }
  onAnimationCartDone(){
    if(this.toCheckout){
      this.router.navigate(["/checkout"]);
    }
  }

  goToCheckout(){
    this.navbarService.toggleCart();
    this.toCheckout=true;
  }

}
