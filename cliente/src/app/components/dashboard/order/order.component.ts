import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from 'src/app/services/crud/crud-service.service';
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
  products:any=[];
  productsIsHidden=true;

  constructor(private alertService:SweetAlertServiceService, private crudService:CrudServiceService){}
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

  getProducts(id:string){
    const orderFound= this.orders.find((order:any)=> order._id==id)
    this.products=orderFound.products
    this.productsIsHidden=false;
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

  // downloadStl(id:any){
  //   this.crudService.getFile('product/download').subscribe({
  //     next:(data){
  //       const blob = new Blob([data], { type: 'application/octet-stream' });
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = id;
  //       document.body.appendChild(a);
  //       a.click();
  //       document.body.removeChild(a);
  //       window.URL.revokeObjectURL(url);
  //     }
  //   })
  // }

}
