import { Component , OnInit } from '@angular/core';
import { CrudServiceService } from 'src/app/services/crud/crud-service.service';
import Swal from 'sweetalert2';
import { opacity0To100 } from 'src/app/utils/animation';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { SweetAlertServiceService } from 'src/app/services/sweetAlert/sweet-alert-service.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  animations:[opacity0To100]
})
export class EmployeeComponent implements OnInit{
  formIsHidden=true;
  employeeForm:FormGroup
  employees:User[]=[]

  constructor(private fb:FormBuilder,private authService:AuthServiceService,private alertService:SweetAlertServiceService, private crudService:CrudServiceService){
    this.employeeForm=this.fb.group({
      'firstName':['',[Validators.required]],
      'lastName':['',[Validators.required]],
      'email':['',[Validators.required,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
      'password':['',[Validators.required,Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$")]],
    })
  }

  ngOnInit(): void {
    this.getAllEmployees()
    
  }

  createEmployee(){
    const USER = new User(this.employeeForm.get('email')?.value,
    this.employeeForm.get('firstName')?.value,
    this.employeeForm.get('lastName')?.value,
    this.employeeForm.get('password')?.value);

    this.authService.signUpEmployee(USER).subscribe({
      next:(data)=>{
        console.log(data)
        this.cancelFormEmployee()
        this.getAllEmployees()
        this.alertService.success("Empleado creado correctamente")
      },error:(e)=>{
        this.alertService.error("Ocurrio un error al crear el empleado")
      }
    })
  }

  getAllEmployees(){
    this.crudService.getAll('user/employees').subscribe({
      next:(data)=>{
        this.employees=data;
        console.log(this.employees);
      }
    })
  }

  showFormEmployee(){
    this.formIsHidden=false;
  }
  cancelFormEmployee(){
    this.formIsHidden=true;
  }
  


}
