import { Component } from '@angular/core';
import { CrudServiceService } from 'src/app/services/crud/crud-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  constructor(private crudService:CrudServiceService){

  }

  makePayment(){
    this.crudService.save("","payment").subscribe({
      next:(data)=>{
        window.location.href = data.init_point;
      }
    })
  }

  redirectToMP(){
    
  }

}
