import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { SweetAlertServiceService } from 'src/app/services/sweetAlert/sweet-alert-service.service';

@Component({
  selector: 'app-navbar-side',
  templateUrl: './navbar-side.component.html',
  styleUrls: ['./navbar-side.component.css']
})
export class NavbarSideComponent implements OnInit {
  fullName="";
  acronymName="";
  userMenuIsHidden:boolean=true;

  constructor(private authService:AuthServiceService,private router:Router,private alertService:SweetAlertServiceService){}
  
  ngOnInit(): void {
    const name=this.authService.getUserName();
    this.fullName=name[0]+" "+name[1];
    this.acronymName=name[0][0]+name[1][0];
  }

  toggleUserMenu(){
    this.userMenuIsHidden=!this.userMenuIsHidden;
  }

  signOut(){
    this.authService.doLogout();
    this.router.navigate(["/auth"])
  }



}
