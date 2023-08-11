import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from 'src/app/services/crud/crud-service.service';
import { SweetAlertServiceService } from 'src/app/services/sweetAlert/sweet-alert-service.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  priceData:any=[];
  buttonIsDisabled=true;
  actualId:any;

  ngOnInit(): void {
    this.getPriceData();
  }


  constructor(private crudService:CrudServiceService,private alertService:SweetAlertServiceService){}

  getPriceData(){
    this.crudService.getAll('price').subscribe({
      next:(data)=>{
        console.log(data);
        this.priceData=data.settings;
        this.actualId=data._id;
      }
    })
  }

  

  toggleInput(input: HTMLInputElement) {
    input.disabled = !input.disabled;

    if (!input.disabled) {
      input.focus();
    }
  }

  activeSaveButton(){
    this.buttonIsDisabled=false;
  }

  disableInput(input: HTMLInputElement) {
    input.disabled = true;
  }

  updateChanges(){
    console.log(this.priceData);
    let prices= this.priceData;
    this.alertService.loading("Actualizando precios..")
    this.crudService.update(prices,'price',this.actualId).subscribe({
      complete:()=>{
        this.alertService.terminateLoading();
        this.alertService.success("Precios actualizados correctamente");
      },error:(e)=>this.alertService.error("Hubo un error al actualizar los precios")
    })
  }



}
