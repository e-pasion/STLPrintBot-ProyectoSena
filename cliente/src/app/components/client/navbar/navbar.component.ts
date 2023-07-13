import { Component } from '@angular/core';
import { NavbarServiceService } from 'src/app/services/navbar/navbar-service.service';
import {opacity0To100, changeWidth0To1002} from 'src/app/utils/animation';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [changeWidth0To1002,opacity0To100]
})
export class NavbarComponent {

  constructor(private navbarService:NavbarServiceService) { 
  }

  openCart(){ 
    this.navbarService.toggleCart()
    this.navbarService.toggleBgBlur()

  }
  isCartOpen(){
    return this.navbarService.getCartStatus()
  }

  isBackgroundBlur(){
    return this.navbarService.getBgBlurStatus()
  }

}
