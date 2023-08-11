import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from 'src/app/services/crud/crud-service.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Product } from 'src/app/models/Product';
import { LocationServiceService } from 'src/app/services/location/location-service.service';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { SweetAlertServiceService } from 'src/app/services/sweetAlert/sweet-alert-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  selectedDepartment:any="";
  validateShip:boolean=false;

  shipData={
    userId:"",
    // firstName: "",
    // lastName:"",
    // numberPhone:"",
    // address:"",
    // city:"",
    // optionalNotes:"",
    shipPrice:0
  }
  shipForm:FormGroup
  constructor(fb:FormBuilder,private crudService:CrudServiceService,private authService:AuthServiceService,private sweetAlertService:SweetAlertServiceService,private locationService:LocationServiceService,private sanitizer: DomSanitizer){
    this.shipForm=fb.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      numberPhone:["",Validators.required],
      address:["",Validators.required],
      department:["",Validators.required],
      city:["",Validators.required],
      optionalNotes:[""],
    })
  }
  ngOnInit(): void {
    this.shipData.userId=this.authService.getUserId();
    this.findTotalPrice();
    this.findProducts()
    this.getDepartments()
  }

  submitDirection(){
      this.validateShip=true;
      this.mapIsEnabled=true;
      const encodedAddress = encodeURIComponent(this.shipForm.get('address')?.value+" "+this.shipForm.get('city')?.value);
      const mapUrl = `https://www.google.com/maps/embed/v1/place?q=${encodedAddress}&zoom=20&key=AIzaSyCEX3tGvVECoFH9a0Na8lPk2oChRALPnkc`;
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl);
      this.findShipPrice()
      this.getDaysShip();
  }

  cancelDirection(){
    this.mapIsEnabled=false;
    this.validateShip=false;
  }

  findShipPrice(){
    this.crudService.save({city:this.shipForm.get('city')?.value},'cart/ship').subscribe({
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

  getDaysShip(){
    this.crudService.getAll('cart/days').subscribe({
      next:(data)=>{
        console.log(data);
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
    this.cities=(this.departments.find((deparment:any)=>deparment.id==this.shipForm.get('department')?.value)).ciudades;
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
}
