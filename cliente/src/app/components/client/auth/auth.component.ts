import { Component,OnInit,ElementRef,ViewChild, HostListener} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User'
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { SweetAlertServiceService } from 'src/app/services/sweetAlert/sweet-alert-service.service';
import { changeTranslate0To100 } from 'src/app/utils/animation';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [changeTranslate0To100]
})
export class AuthComponent implements OnInit {
  userIsInMobile:boolean=false;
  loginVisible:boolean=true;
  registerForm: FormGroup;
  loginForm: FormGroup;
  id: string | null;
  loginAnimationOpen:boolean=true;



  constructor(private fb:FormBuilder,private authService:AuthServiceService,private sweetAlertService:SweetAlertServiceService,private router:Router,private aRoute:ActivatedRoute){
    this.registerForm=this.fb.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      registerEmail:['',[Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
      registerPassword:['',[Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$")]],
      password2:['',[Validators.required,this.passwordMatchValidator]]
    })

    this.loginForm=this.fb.group({
      loginEmail:['',[Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
      loginPassword:['',Validators.required]
    })
    this.id=this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    window.innerWidth<640 ? this.userIsInMobile=true:this.userIsInMobile=false;
    console.log(this.userIsInMobile);
    if(this.authService.isLoggedIn()){
      this.router.navigate(["/profile"])
    }
  }

  @HostListener('window:resize')//esta funcion se ejecuta cada que cambia el tamaño de la pantalla
  onWindowResize() {
    window.innerWidth<640 ? this.userIsInMobile=true:this.userIsInMobile=false;
  }

  changeLoginAnimation(){
    this.loginAnimationOpen=!this.loginAnimationOpen;
    console.log(this.loginAnimationOpen);
  }

  cambiarLoginRegistro(){
    this.loginVisible=!this.loginVisible;
  }

  passwordMatchValidator(control: FormControl): { [key: string]: boolean } | null {
    const password = control.root.get('registerPassword')?.value;
    const confirmPassword = control.value;
  
    if (password !== confirmPassword) {
      return { 'passwordMismatch': true };
    }
    return null;
  }


  changePassword(){
    this.registerForm.get('registerPassword')!.updateValueAndValidity();
    this.registerForm.get('password2')!.updateValueAndValidity();
  }

  login(){
    const USER: User = {
      email:this.loginForm.get('loginEmail')?.value.toLowerCase(),
      password:this.loginForm.get('loginPassword')?.value
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
        this.loginForm.reset()

      },
      error: (e)=>{
        this.sweetAlertService.error("Hubo un error al iniciar sesion")
        this.loginForm.reset()
      },
    }
    )
  }

  

  register(){

    const USER: User = {
      firstName:this.registerForm.get('firstName')?.value,
      lastName:this.registerForm.get('lastName')?.value,
      email:this.registerForm.get('registerEmail')?.value.toLowerCase(),
      password:this.registerForm.get('registerPassword')?.value
    }

    this.authService.signUp(USER).subscribe({
      next: (data)=>{
        console.log(data)
        this.sweetAlertService.success("El registro fue exitoso")
        this.registerForm.reset()
        this.cambiarLoginRegistro()

      },
      error: (e)=>{
        this.sweetAlertService.error("Hubo un error en el registro intentelo denuevo")
        this.registerForm.reset()
      },
    }
    )
  }

}
