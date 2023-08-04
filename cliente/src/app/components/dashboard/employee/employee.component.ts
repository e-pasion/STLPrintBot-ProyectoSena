import { Component , OnInit } from '@angular/core';
import { CrudServiceService } from 'src/app/services/crud/crud-service.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
  dtOptions: DataTables.Settings = {};
  formIsHidden=true;

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-MX.json',
    },
      pagingType: 'full_numbers',
      pageLength:10,
      dom:'<f<t>ip>'
    };
  }


  createEmployee(){
    this.formIsHidden=false;


  }

  cancelForm(){
    this.formIsHidden=true;

  }
  


}
