import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { CrudServiceService } from 'src/app/services/crud/crud-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userData={
    name:"",
    email:""
  }
  constructor(private crudService:CrudServiceService,private authService:AuthServiceService,private router:Router){}

  ngOnInit(): void {
    this.crudService.get("user",this.authService.getUserId()).subscribe({
      next: (data)=>{
        this.userData={
          name:data.firstName+ " "+data.lastName,
          email:data.email
        }
      },
      error: (e)=>{
        console.log(e)
      },
    })
  }

}
