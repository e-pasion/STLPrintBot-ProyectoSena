import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { CrudServiceService } from 'src/app/services/crud/crud-service.service';
import { FileServiceService } from 'src/app/services/file/file-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private crudService:CrudServiceService, private fileService:FileServiceService,private authService:AuthServiceService){}

  products:Product[]=[]
  totalPrice:number=0;

  ngOnInit(): void {

    this.findProducts();
  }

  calculatePrice(weigth:number,quantity:number){
    return ((weigth*quantity*80000)/1000).toFixed(0)

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

}
