import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CrudServiceService } from 'src/app/services/crud/crud-service.service';
import { FileServiceService } from 'src/app/services/file/file-service.service';
import { SweetAlertServiceService } from 'src/app/services/sweetAlert/sweet-alert-service.service';
import { opacity0To100 } from 'src/app/utils/animation';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  animations:[opacity0To100]
})
export class OrderComponent implements OnInit {
  paginationData:any = {};
  showingRange: string='';
  currentPage: number=1;
  orders:any=[];
  orderFound:any;
  products:any=[];
  productsIsHidden=true;
  mapUrl: SafeResourceUrl | undefined;


  constructor(private alertService:SweetAlertServiceService, private crudService:CrudServiceService,private sanitizer: DomSanitizer, private fileService:FileServiceService){}
  ngOnInit(): void {
    this.getAllOrders();
  }
    params = new HttpParams()
    .set('page', this.currentPage)
    .set('limit', 8)
    .set('status','processing')


  statusToggle:any={
    processing:true,
    sending:false,
    finished:false
  };

  changeStatus(status:string){
    Object.keys(this.statusToggle).map((key) => {
      this.statusToggle[key]=(key==status)?true:false;
    });
    this.currentPage = 1;
    this.params=this.params.set('page', this.currentPage);
    this.params=this.params.set('status',status );
    this.getAllOrders();
  }

  getAllOrders(){
    this.crudService.getAllWithParams('detail',this.params).subscribe({
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
        this.orders=data.docs;
        
        console.log(data);
      }
    })
  }

  changePage(page:any){
    this.currentPage=page;
    this.params=this.params.set('page', this.currentPage);
    this.getAllOrders()
  }

  getOrders(id:string){
    this.orderFound= this.orders.find((order:any)=> order._id==id)
    this.products=this.orderFound.cartUsed.products
    this.productsIsHidden=false;

    if(this.statusToggle.sending){
      const encodedAddress = encodeURIComponent(this.orderFound.cartUsed.shipData.address+" "+this.orderFound.cartUsed.shipData.city+" "+this.orderFound.cartUsed.shipData.department);
      const mapUrl = `https://www.google.com/maps/embed/v1/place?q=${encodedAddress}&zoom=20&key=AIzaSyCEX3tGvVECoFH9a0Na8lPk2oChRALPnkc`;
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl);
    }
  }

  closeProducts(){
    this.productsIsHidden=true;
  }

  calculateShowingRange(): string {
    const firstItemIndex = (this.paginationData.page - 1) * this.paginationData.limit + 1;
    const lastItemIndex = Math.min(
      this.paginationData.page * this.paginationData.limit,
      this.paginationData.totalDocs
    );
    return `Mostrando ${firstItemIndex} a ${lastItemIndex} de ${this.paginationData.totalDocs} Entradas`;
  }

  changeOrderStatus(orderId:string,status:string){
    let msg='';
    if(status=='finished') msg='¿Estás seguro de que deseas finalizar el pedido? Esta acción es irreversible.' 
    else if(status=='sending') msg='"¿Estás seguro de que deseas cambiar el estado del pedido a en envio? Esta acción es irreversible."'

    this.alertService.question(msg,"si","no").then((result) => {
      if (result.isConfirmed) {
        const data={
          orderId,
          status
        }
        this.crudService.updateWithoutId(data,'detail/status').subscribe({
          next:(data)=> console.log(data),
          error:(error)=> console.log(error),
          complete: ()=> this.getAllOrders()
        })
      }
    })
  }


  getDateString(date:any){
    if(date==null) return '';
    return new Date(date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  returnDateColor(date:any){
    const difference =new Date(date).getTime()- new Date().getTime();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    console.log(days)
    if (days >= 3) {
      return 'bg-green-100';
    } else if (days>=0) {
      return 'bg-yellow-100';
    } else{
      return 'bg-red-100';
    }
  }

  generatePDF(id:any){
    this.alertService.loading("Generando pdf...");
    this.fileService.generatePDF(id)
    .subscribe({
      next:(data: ArrayBuffer)=>{
        const blob = new Blob([data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(blob);
      window.open(pdfUrl, '_blank');
      this.alertService.terminateLoading();
      },error:(error)=>{
        this.alertService.error("Error al generar el PDF");
      }
    })
  }

}
