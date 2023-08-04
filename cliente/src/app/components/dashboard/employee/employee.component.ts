import { Component , OnInit } from '@angular/core';
import { CrudServiceService } from 'src/app/services/crud/crud-service.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { opacity0To100 } from 'src/app/utils/animation';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { error } from 'jquery';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  animations:[opacity0To100]
})
export class EmployeeComponent implements OnInit{
  dtOptions: DataTables.Settings = {};
  formIsHidden=true;
  employeeForm:FormGroup

  constructor(private fb:FormBuilder,private authService:AuthServiceService){
    this.employeeForm=this.fb.group({
      'firstName':['',[Validators.required]],
      'lastName':['',[Validators.required]],
      'email':['',[Validators.required,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
      'password':['',[Validators.required,Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$")]],
    })
  }

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-MX.json',
    },
      pagingType: 'full_numbers',
      pageLength:10,
      dom:'<fl<t>ip>'
    };
  }

  showCreateEmployee(){
    this.formIsHidden=false;
  }


  createEmployee(){

    const USER = new User(this.employeeForm.get('email')?.value,
    this.employeeForm.get('firstName')?.value,
    this.employeeForm.get('lastName')?.value,
    this.employeeForm.get('password')?.value)
    this.authService.signUp(USER).subscribe({
      next:(data)=>{
        console.log(data)
      },error:(e)=>{
        console.log(e)
      }
    })


  }

  cancelForm(){
    this.formIsHidden=true;

  }
  


}
