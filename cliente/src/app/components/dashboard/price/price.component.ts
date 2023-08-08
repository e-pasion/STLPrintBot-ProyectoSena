import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from 'src/app/services/crud/crud-service.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  priceData:any=[];

  ngOnInit(): void {
    this.getPriceData();
  }


  constructor(private crudService:CrudServiceService){}

  getPriceData(){
    this.crudService.getAll('price').subscribe({
      next:(data)=>{
        console.log(data);
        this.priceData=data;
      }
    })
  }



}
