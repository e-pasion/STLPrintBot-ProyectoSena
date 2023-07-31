import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { NavbarServiceService } from 'src/app/services/navbar/navbar-service.service';
import {opacity0To100, changeWidth0To1002} from 'src/app/utils/animation';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [changeWidth0To1002,opacity0To100]
})
export class NavbarComponent {
  navbarFixed: boolean = false;
  
  
  constructor(private navbarService:NavbarServiceService,private authService:AuthServiceService,private router:Router) { 
  }

  @HostListener('window:scroll',['$event']) onScroll()
{
  console.log("object");
}
  
  userIsInCheckout(){
    return this.router.url === '/checkout';
  }

  userIsInHome(){
    return this.router.url === '/';

  }

  openCart(){ 
    this.navbarService.toggleCart()

  }
  isCartOpen(){
    return this.navbarService.getCartStatus()
  }

  userIsLogged(){
    return this.authService.isLoggedIn();
  }

}
