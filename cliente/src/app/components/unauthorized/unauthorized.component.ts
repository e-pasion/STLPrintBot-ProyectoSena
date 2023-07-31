import { Component,OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {
  isAdmin:boolean=true;

  constructor(private authService:AuthServiceService){

  }


  ngOnInit(){
    this.checkIsAdmin();
  }

  checkIsAdmin(){
    this.isAdmin=this.authService.isAdmin();
  }

  

}
