import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Color } from 'src/app/models/Color';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { CrudServiceService } from 'src/app/services/crud/crud-service.service';
import { SweetAlertServiceService } from 'src/app/services/sweetAlert/sweet-alert-service.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent {
  formIsHidden=true;
  
  colors:Color[]=[]
  searchQuery="";
  statusQuery="";
  currentPage: number=1;
  showingRange='';
  actualId="";
  paginationData:any = {};



  constructor(private authService:AuthServiceService,private alertService:SweetAlertServiceService, private crudService:CrudServiceService){}
  

  params = new HttpParams()
  .set('page', this.currentPage)
  .set('limit', 8)

  ngOnInit(): void {
    this.getAllColors()
  }




  search(){
    this.currentPage = 1;
    this.params=this.params.set('page', this.currentPage);
    this.params=this.params.set('search',this.searchQuery);
    console.log(this.params);
    this.getAllColors();
  }


  getAllColors(){
    this.crudService.getAllWithParams('color',this.params).subscribe({
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
        this.colors=data.docs;
        console.log(data);
      }
    })
  }



  searchColorStatus(){
    this.currentPage = 1;
    this.params=this.params.set('page', this.currentPage);
    this.params=this.params.set('status',this.statusQuery);
    this.getAllColors();
  }

  toggleColorStatus(id:any){
    this.crudService.update(null,"color/status",id).subscribe({
      next:(data)=>{
        this.getAllColors();
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
    this.getAllColors()
  }

  removeColor(id:any){
    this.alertService.question('¿Seguro quieres borrar este color?','Borrar','No borrar')
        .then((result) => {
      if (result.isConfirmed) {
        if(this.colors.length==1 && this.paginationData.prevPage!=null){
          this.currentPage=this.currentPage-1;
          this.params=this.params.set('page', this.currentPage);

        }

        this.crudService.delete(id,"color").subscribe({
          complete:()=>{
            console.log('Color deleted');
            this.getAllColors();
          },error:()=>{
            console.log('Error deleted color');
          }
        })
      } 
    }
    )
  }


}


