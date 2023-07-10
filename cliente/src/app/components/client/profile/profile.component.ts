import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { CrudServiceService } from 'src/app/services/crud/crud-service.service';

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
  constructor(private crudService:CrudServiceService,private authService:AuthServiceService,private router:Router){}

  ngOnInit(): void {
    this.crudService.get("user",this.authService.getUserId()).subscribe({
      next: (data)=>{
        this.userData={
          name:data.fullName,
          email:data.email
        }
      },
      error: (e)=>{
        console.log(e)
      },
    })
  }

  logout(){
    this.authService.doLogout();
    this.router.navigate(["/auth"])
  }

}
