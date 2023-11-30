import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { CrudServiceService } from 'src/app/services/crud/crud-service.service';
import { LocationServiceService } from 'src/app/services/location/location-service.service';
import { NavbarServiceService } from 'src/app/services/navbar/navbar-service.service';
import { SweetAlertServiceService } from 'src/app/services/sweetAlert/sweet-alert-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userData: any;
  departments: any = [];
  cities: any = [];
  contactForm: FormGroup;
  userForm:FormGroup;
  contactFormActive: boolean = false;
  userFormActive:boolean=false;
  validateFormActive:boolean=true;
  canCloseContactForm: boolean = true;
  passwordValidText:any="";

  openPendingOrders=false;
  openFinishedOrders=false;

  finishedOrders:any=[];
  nonFinishedOrders:any=[];
  constructor(
    private fb: FormBuilder,
    private crudService: CrudServiceService,
    private authService: AuthServiceService,
    private router: Router,
    private alertService: SweetAlertServiceService,
    private locationService: LocationServiceService,
    private navbarService: NavbarServiceService
  ) {
    this.contactForm = fb.group({
      numberPhone: ['', Validators.required],
      address: ['', Validators.required],
      department: ['', Validators.required],
      city: ['', Validators.required],
    });

    this.userForm= fb.group({
      email:['',[Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
      password:['',[Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$")]]
    })
  }

  ngOnInit(): void {
    this.getDepartments();
    this.getUserData();
    this.getOrders();
  }

  handleOpenPendingOrder(){
    this.openPendingOrders=!this.openPendingOrders;
  }

  handleOpenFinishedOrder(){
    this.openFinishedOrders=!this.openFinishedOrders;
  }


  getOrders(){
    this.crudService.getAll("detail/byUser").subscribe({
      next:(data)=> {
        console.log(data);
        this.finishedOrders=data.finishedOrders;
        this.nonFinishedOrders=data.nonFinishedOrders;
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  getUserData() {
    this.alertService.loading("Cargando informacion")
    this.crudService.getAll('user').subscribe({
      next: (data) => {
        this.userData = data;
        this.alertService.terminateLoading();
        if (
          
            this.userData.numberPhone==undefined ||
            this.userData.address==undefined ||
            this.userData.department==undefined ||
            this.userData.city==undefined
        ) {
          this.showContactForm(true);
          this.canCloseContactForm = false;
        } 
        this.userForm.patchValue({
          email:this.userData.email,
          password:""
        })

        this.contactForm.patchValue({
          numberPhone:this.userData.numberPhone || "",
          address: this.userData.address || "",
          department: this.userData.department,
          city: this.userData.city
        });
        this.getCities();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  showContactForm(condition: boolean) {
    this.contactFormActive = condition;
  }

  showUserForm(condition:boolean){
    this.userFormActive= condition;
    this.validateFormActive=true;
  }

  getDepartments() {
    this.locationService.getDepartments().subscribe({
      next: (data) => {
        this.departments = data;
      },
    });
  }
  getCities() {
    this.cities = this.departments.find(
      (deparment: any) =>
        deparment.departamento == this.contactForm.get('department')?.value
    ).ciudades;
  }

  updateContactInfo() {
    const CONTACT_DATA = {
      address: this.contactForm.get('address')?.value,
      department: this.contactForm.get('department')?.value,
      city: this.contactForm.get('city')?.value,
      numberPhone: this.contactForm.get('numberPhone')?.value,
    };
    this.alertService.loading('Actualizando información');

    this.crudService.updateWithoutId(CONTACT_DATA, 'user/contact').subscribe({
      complete: () => {
        this.getUserData();
        this.showContactForm(false);
        this.alertService.terminateLoading();
        this.alertService.success("Datos actualizados correctamente");
      },
      error:(err)=> {
        this.alertService.terminateLoading();
        console.log(err);
        this.alertService.error("Hubo un error al actualizar los datos");
      },
    });
  }

  updatePasswordAndEmail(){
    const USER_DATA={
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
    }
    this.alertService.loading('Actualizando información');

    this.crudService.updateWithoutId(USER_DATA, 'user/access').subscribe({
      complete: () => {
        this.getUserData();
        this.showContactForm(false);
        this.alertService.terminateLoading();
        this.alertService.success("Datos actualizados correctamente");
        this.userFormActive=false;
        this.validateFormActive=true;
      },
      error:(err)=> {
        this.alertService.terminateLoading();
        this.alertService.error(err.error.message || "Hubo un error al actualizar los datos");
      },
    });
  }

  validatePassword(){
    this.alertService.loading('Validando contraseña');
    this.crudService.save({password:this.passwordValidText},'auth/validate-password').subscribe({
      complete:()=> {
        this.alertService.terminateLoading();
        this.alertService.success("Contraseña correcta");
        this.validateFormActive=false;
        this.passwordValidText="";
      },error:(err)=> {
        this.alertService.terminateLoading();
        this.alertService.error("Contraseña incorrecta");        
      },
    })
  }

  getDateString(date:any){
    if(date==null) return '';
    return new Date(date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  logout() {
    this.alertService.loading('Cerrando sesión');
    this.authService.doLogout().subscribe({
      complete: () => {
        this.alertService.terminateLoading();
        this.navbarService.getCartLength();
        this.router.navigate(['/auth']);
      },
      error: (err) => {
        this.alertService.terminateLoading();
        this.alertService.error('Hubo un error al cerrar sesion');
      },
    });
  }
}
