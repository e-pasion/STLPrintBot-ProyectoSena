import { Component , OnInit } from '@angular/core';
import { CrudServiceService } from 'src/app/services/crud/crud-service.service';
import Swal from 'sweetalert2';
import { opacity0To100 } from 'src/app/utils/animation';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { SweetAlertServiceService } from 'src/app/services/sweetAlert/sweet-alert-service.service';
import { HttpParams } from '@angular/common/http';

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
  searchQuery="";
  statusQuery="";
  currentPage: number=1;
  createEmployeeTitle='Crear Empleado';
  createEmployeeButton='Crear';
  showingRange='';
  actualId="";
  paginationData:any = {};


  constructor(private fb:FormBuilder,private authService:AuthServiceService,private alertService:SweetAlertServiceService, private crudService:CrudServiceService){
    this.employeeForm=this.fb.group({
      'firstName':['',[Validators.required]],
      'lastName':['',[Validators.required]],
      'email':['',[Validators.required,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
      'password':['',[Validators.required,Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$")]],
    })
  }

  params = new HttpParams()
  .set('page', this.currentPage)
  .set('limit', 8)

  ngOnInit(): void {
    this.getAllEmployees()
  }

  createEmployee(){
    const USER = new User(this.employeeForm.get('email')?.value,
    this.employeeForm.get('firstName')?.value,
    this.employeeForm.get('lastName')?.value,
    this.employeeForm.get('password')?.value);
    if(this.actualId==""){
    this.authService.signUpEmployee(USER).subscribe({
      next:(data)=>{
        console.log(data)
        this.cancelFormEmployee()
        this.employeeForm.reset()
        this.getAllEmployees()
        this.alertService.success("Empleado creado correctamente")
      },error:(e)=>{
        this.alertService.error("Ocurrio un error al crear el empleado")
      }
    })}else{//se edita
      this.crudService.update(USER,"user/employee",this.actualId).subscribe({
        complete:()=>{
          this.actualId="";
          this.cancelFormEmployee()
          this.getAllEmployees();
          this.employeeForm.reset()
          this.alertService.success("Empleado editado correctamente")
        },error:(e)=>{
          this.alertService.error("Ocurrio un error al editar el empleado")
        }
      })


    }
  }

  search(){
    this.currentPage = 1;
    this.params=this.params.set('page', this.currentPage);
    this.params=this.params.set('search',this.searchQuery);
    console.log(this.params);
    this.getAllEmployees();
  }


  getAllEmployees(){
    this.crudService.getAllWithParams('user/employees',this.params).subscribe({
      next:(data)=>{
        this.paginationData={
          hasNextPage: data.hasNextPage,
          hasPrevPage: data.hasPrevPage,
          limit: data.limit,
          nextPage: data.nextPage,
          page: data.page,
          pagingCounter: data.pagingCounter,
          prevPage: data.prevPage,
          totalDocs: data.totalDocs,
          totalPages: data.totalPages
        };
        this.showingRange=this.calculateShowingRange();
        this.employees=data.docs;
        console.log(data);
      }
    })
  }

  showFormEmployee(){
    this.createEmployeeTitle='Crear Empleado';
    this.createEmployeeButton='Crear';
    this.formIsHidden=false;
  }
  showFormEditEmployee(id:any){
    this.actualId=id;
    this.createEmployeeTitle='Editar Empleado';
    this.createEmployeeButton='Editar';

    this.crudService.get("user",id).subscribe({
      next:(data)=>{
        this.employeeForm.patchValue(data);
      }
    })

    this.formIsHidden=false;
  }
  cancelFormEmployee(){
    this.employeeForm.reset()
    this.formIsHidden=true;
    this.actualId="";
  }

  searchEmployeeStatus(){
    this.currentPage = 1;
    this.params=this.params.set('page', this.currentPage);
    this.params=this.params.set('status',this.statusQuery);
    this.getAllEmployees();
  }

  toggleEmployeeStatus(id:any){
    this.crudService.update(null,"user/status",id).subscribe({
      next:(data)=>{
        this.getAllEmployees();
      }
    })
  }

  calculateShowingRange(): string {
    const firstItemIndex = (this.paginationData.page - 1) * this.paginationData.limit + 1;
    const lastItemIndex = Math.min(
      this.paginationData.page * this.paginationData.limit,
      this.paginationData.totalDocs
    );
    return `Mostrando ${firstItemIndex} a ${lastItemIndex} de ${this.paginationData.totalDocs} Entradas`;
  }

  changePage(page:any){
    this.currentPage=page;
    this.params=this.params.set('page', this.currentPage);
    this.getAllEmployees()
  }

  removeEmployee(id:any){
    if(this.employees.length==1 && this.paginationData.prevPage!=null){
      this.currentPage=this.currentPage-1;
      this.params=this.params.set('page', this.currentPage);
    }

    this.crudService.delete(id,"user/employee").subscribe({
      complete:()=>{
        console.log('Employee deleted');
        this.getAllEmployees();
      },error:()=>{
        console.log('Error deleted employee');
      }
    })
  }


}
