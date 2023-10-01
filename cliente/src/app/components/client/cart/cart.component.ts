import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { CrudServiceService } from 'src/app/services/crud/crud-service.service';
import { FileServiceService } from 'src/app/services/file/file-service.service';
import { NavbarServiceService } from 'src/app/services/navbar/navbar-service.service';
import { SweetAlertServiceService } from 'src/app/services/sweetAlert/sweet-alert-service.service';
import { changeWidth0To1002 } from 'src/app/utils/animation';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations:[changeWidth0To1002]  

})
export class CartComponent implements OnInit {

  constructor(private navbarService:NavbarServiceService,private crudService:CrudServiceService, private fileService:FileServiceService,private authService:AuthServiceService, private router:Router,private alertService:SweetAlertServiceService) { 
  }

  loadingIsHidden:boolean=false;
  products:any=[]
  totalPrice:number=0;
  toCheckout:boolean=false;//variable creada para que si es true, cuando termine la animacion cambie la pagina a checkout



  ngOnInit(): void {
    this.findProducts();
  }

  calculatePrice(price:number,quantity:number){
    console.log(price);
    return this.adjustPrice(price*quantity)

  }
   adjustPrice(price:number){
    return (price-price%50).toFixed(0);
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
    this.crudService.getAll('cart').subscribe({
      next:(data)=>{
        this.products=data.products;
        console.log(data);
      },
      error:(e)=>{
        this.loadingIsHidden=true;
      },
      complete:()=>{
        this.findTotalPrice();
        this.loadingIsHidden=true;
      }
    })
  }

  deleteProduct(id:string){
    this.alertService.question('¿Seguro quieres borrar el archivo?','Borrar','No borrar')
    .then((result) => {
      if (result.isConfirmed) {
        this.alertService.loading('Borrando archivo')
        this.crudService.delete(id,"calculator").subscribe({
          complete:()=>{
            this.navbarService.updateCartLength(-1);
            this.findProducts()
            this.alertService.terminateLoading()
          },
          error:(e)=>{
            console.error(e);
          }
        })
      }})
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
