import { Component,OnInit,ElementRef,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User'
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { SweetAlertServiceService } from 'src/app/services/sweetAlert/sweet-alert-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginVisible:boolean=true;
  userForm: FormGroup;
  id: string | null;


  constructor(private fb:FormBuilder,private authService:AuthServiceService,private sweetAlertService:SweetAlertServiceService,private router:Router,private aRoute:ActivatedRoute){
    this.userForm=this.fb.group({
      fullName:[''],
      email:[''],
      password:[''],
      password2:['']
    })
    this.id=this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(["/profile"])
    }
  }

  cambiarLoginRegistro(){
    this.loginVisible=!this.loginVisible;
  }

  login(){
    const USER: User = {
      fullName:"",
      email:this.userForm.get('email')?.value,
      password:this.userForm.get('password')?.value
    }


    this.authService.signIn(USER).subscribe({
      next: (data)=>{
        console.log(data)
        this.sweetAlertService.success("Logeo exitoso")
        this.authService.setToken(data.token)
        if(this.authService.isClient()){
          this.router.navigate(["/profile"])
        }else{
          this.router.navigate(["/dashboard/create-color"])
        }
        this.userForm.reset()

      },
      error: (e)=>{
        this.sweetAlertService.error("Hubo un error al iniciar sesion")
        this.userForm.reset()
      },
    }
    )
  }

  

  register(){

    const USER: User = {
      fullName:this.userForm.get('fullName')?.value,
      email:this.userForm.get('email')?.value,
      password:this.userForm.get('password')?.value
    }

    this.authService.signUp(USER).subscribe({
      next: (data)=>{
        console.log(data)
        this.sweetAlertService.success("El registro fue exitoso")
        this.userForm.reset()

      },
      error: (e)=>{
        this.sweetAlertService.error("Hubo un error en el registro intentelo denuevo")
        this.userForm.reset()
      },
    }
    )
  }

}
