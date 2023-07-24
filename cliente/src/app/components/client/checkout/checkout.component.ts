import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from 'src/app/services/crud/crud-service.service';
import * as Leaflet from 'leaflet'; 
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Product } from 'src/app/models/Product';
import { LocationServiceService } from 'src/app/services/location/location-service.service';

Leaflet.Icon.Default.imagePath = 'assets/';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  products:Product[]=[]
  departments:any=[]  
  cities:any=[]
  mapIsEnabled:boolean=false;
  mapUrl: SafeResourceUrl | undefined;
  totalPrice: number=0;
  selectedDepartment:any=999;

  shipData={
    firstName: "",
    lastName:"",
    numberPhone:"",
    address:"",
    city:999,
    optionalNotes:"",
    shipPrice:0
  }

  constructor(private crudService:CrudServiceService,private locationService:LocationServiceService,private sanitizer: DomSanitizer){}
  ngOnInit(): void {
    this.findTotalPrice();
    this.findProducts()
    this.getDepartments()
  }

  submitDirection(){
    this.mapIsEnabled=true;
    const encodedAddress = encodeURIComponent(this.shipData.address+" "+this.shipData.city);
    const mapUrl = `https://www.google.com/maps/embed/v1/place?q=${encodedAddress}&zoom=20&key=AIzaSyCEX3tGvVECoFH9a0Na8lPk2oChRALPnkc`;
    // Sanitize the URL to mark it as safe for resource URL context
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl);
    this.findShipPrice()
  }

  cancelDirection(){
    this.mapIsEnabled=false;
  }

  findShipPrice(){
    let data={
      city:this.shipData.city
    }
    this.crudService.save(data,'cart/ship').subscribe({
      next:(data)=>{
        console.log(data);
        this.shipData.shipPrice=data;
      },
      error:(e)=>{
        console.log(e);
      }    
    })
  }

  findTotalPrice(){
    this.crudService.getAll('cart/price').subscribe({
      next:(data)=>{
        console.log(data);
        this.totalPrice=data;
      },
      error:(e)=>{
        console.log(e);
      }    
    })
  }


  getDepartments(){
    this.locationService.getDepartments().subscribe({
      next:(data)=>{
        this.departments=data;
      }
    })
  }
  getCities(){
    console.log(this.selectedDepartment);
    this.cities=(this.departments.find((deparment:any)=>deparment.id==this.selectedDepartment)).ciudades;
    console.log(this.cities);
  }

  findProducts(){
    this.crudService.getAll('cart/').subscribe({
      next:(data)=>{
        this.products=data;

        console.log(this.products)
      },
      error:(e)=>{
        console.log(e);
      },
      complete:()=>{
        this.findTotalPrice();
      }
    })
  }


  makePayment(){
    this.crudService.save(this.shipData,"payment").subscribe({
      next:(data)=>{
        window.location.href = data.init_point;
      }
    })
  }

  redirectToMP(){
    
  }
 

}
