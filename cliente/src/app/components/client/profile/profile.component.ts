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
  isHoveredSettings: boolean = false;
  isHoveredDirections: boolean = false;
  isHoveredExit: boolean = false;
  userData={
    name:"",
    email:""
  }
  constructor(private crudService:CrudServiceService,private authService:AuthServiceService,private router:Router,private alertService:SweetAlertServiceService){}

  ngOnInit(): void {
    // this.crudService.get("user",this.authService.getUserId()).subscribe({
    //   next: (data)=>{
    //     this.userData={
    //       name:data.firstName+ " "+data.lastName,
    //       email:data.email
    //     }
    //   },
    //   error: (e)=>{
    //     console.log(e)
    //   },
    // })
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
