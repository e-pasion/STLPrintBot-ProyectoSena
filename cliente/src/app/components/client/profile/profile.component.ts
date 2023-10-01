import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { CrudServiceService } from 'src/app/services/crud/crud-service.service';
import { SweetAlertServiceService } from 'src/app/services/sweetAlert/sweet-alert-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData:any;
  constructor(private crudService:CrudServiceService,private authService:AuthServiceService,private router:Router,private alertService:SweetAlertServiceService){}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
        this.crudService.getAll("user").subscribe({
      next: (data)=>{
        console.log(data);
        this.userData=data;
      },
      error: (e)=>{
        console.log(e)
      },
    })
  }

  logout(){
    this.alertService.loading("Cerrando sesión")
    this.authService.doLogout().subscribe({
      complete:()=>{
        this.alertService.terminateLoading()
        this.router.navigate(["/auth"])
      },error:(err)=>{
        this.alertService.terminateLoading()
        this.alertService.error("Hubo un error al cerrar sesion")
      }
    });
  }

}
