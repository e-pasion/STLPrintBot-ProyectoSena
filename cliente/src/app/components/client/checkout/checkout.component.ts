import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from 'src/app/services/crud/crud-service.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
  products:any=[]
  departments:any=[]  
  cities:any=[]
  mapIsEnabled:boolean=false;
  mapUrl: SafeResourceUrl | undefined;
  productPrice: number=0;
  selectedDepartment:any="";
  validateShip:boolean=false;
  shipPrice=0;
  shipDate: Date | null = null;
  discountPrice=0;
  code="";
  
  shipForm:FormGroup
  constructor(fb:FormBuilder,private crudService:CrudServiceService,private alertService:SweetAlertServiceService,private locationService:LocationServiceService,private sanitizer: DomSanitizer){
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
    this.getDepartments()
    this.findTotalPrice();
    this.findCart()
  }

  

  async submitDirection(){
      this.validateShip=true;
      this.mapIsEnabled=true;
      const encodedAddress = encodeURIComponent(this.shipForm.get('address')?.value+" "+this.shipForm.get('city')?.value+" "+this.shipForm.get('department')?.value);
      const mapUrl = `https://www.google.com/maps/embed/v1/place?q=${encodedAddress}&zoom=20&key=AIzaSyCEX3tGvVECoFH9a0Na8lPk2oChRALPnkc`;
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl);
      this.findShipPrice()
  }

  cancelDirection(){
    this.mapIsEnabled=false;
    this.validateShip=false;
  }

  findShipPrice(){
    this.crudService.save({city:this.shipForm.get('city')?.value},'cart/ship').subscribe({
      next:(data)=>{
        console.log(data);
        this.shipPrice=data.shipPrice;
        this.shipDate=data.shipDate;
        this.saveShipData()
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
        this.productPrice=data;
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
    this.cities=(this.departments.find((deparment:any)=>deparment.departamento==this.shipForm.get('department')?.value)).ciudades;
  }

  findCart(){
    this.crudService.getAll('cart/').subscribe({
      next:(data)=>{
        this.products=data.products;
        if(data.shipData) {
          this.shipForm.patchValue(data.shipData)
          this.shipPrice=data.shipData.shipPrice
          this.shipDate=data.shipData.estimatedDate
          this.getCities();
        };
        if(data.codeUsed){
          console.log(data.codeUsed);
          this.discountPrice=Math.round(this.productPrice*(data.codeUsed.discount/100)/50)*50;
        }
        console.log(data)
      },
      error:(e)=>{
        console.log(e);
      },
      complete:()=>{
        this.findTotalPrice();
      }
    })
  }

  applyCode(){
    console.log(this.code);
    this.crudService.save({code:this.code,price:this.productPrice},"code/verify").subscribe({
      next:(data)=>{
        console.log(data);
        const discount=data.discount;
        this.alertService.success(`¡Código válido! Has obtenido un descuento del ${discount}% en tu compra.`)
        this.discountPrice=data.price
      },error:(e)=>{
        this.alertService.error(e.error.message);
      }
    })
  }

  saveShipData(){
    console.log(this.shipPrice);
    const shipData={
      firstName:this.shipForm.get('firstName')?.value,
      lastName:this.shipForm.get('lastName')?.value,
      address:this.shipForm.get('address')?.value,
      department:this.shipForm.get('department')?.value,
      city:this.shipForm.get('city')?.value,
      numberPhone:this.shipForm.get('numberPhone')?.value,
      optionalNotes:this.shipForm.get('optionalNotes')?.value ||"",
      estimatedDate:this.shipDate,
      shipPrice:this.shipPrice
    }
    this.crudService.save(shipData,"cart/shipData").subscribe({
      next:(data)=>{
        console.log(data);
      }
    })

  }

  getDateString(date:any){
    if(date==null) return '';
    return new Date(date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
  }


  makePayment(){
    this.crudService.getAll("payment").subscribe({
      next:(data)=>{
        window.location.href = data.link;
      }
    })
  }
}
