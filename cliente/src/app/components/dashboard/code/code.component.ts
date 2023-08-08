import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Code } from 'src/app/models/Code';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { CrudServiceService } from 'src/app/services/crud/crud-service.service';
import { SweetAlertServiceService } from 'src/app/services/sweetAlert/sweet-alert-service.service';
import { opacity0To100 } from 'src/app/utils/animation';


@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css'],
  animations:[opacity0To100]

})
export class CodeComponent {

  formIsHidden=true;
  codeForm:FormGroup
  codes:Code[]=[]
  searchQuery="";
  statusQuery="";
  currentPage: number=1;
  createCodeTitle='Crear Codigo';
  createCodeButton='Crear';
  showingRange='';
  actualId="";
  paginationData:any = {};


  constructor(private fb:FormBuilder,private authService:AuthServiceService,private alertService:SweetAlertServiceService, private crudService:CrudServiceService){
    this.codeForm=this.fb.group({
      'code':['',[Validators.required]],
      'startDate':['',[Validators.required]],
      'finalDate':['',[Validators.required]],
    })
  }

  params = new HttpParams()
  .set('page', this.currentPage)
  .set('limit', 8)

  ngOnInit(): void {
    this.getAllCodes()
  }

  createCode(){
    const CODE = new Code(this.codeForm.get('code')?.value,
    this.codeForm.get('startDate')?.value,
    this.codeForm.get('finalDate')?.value,
    )
    if(this.actualId==""){
    this.crudService.save(CODE,"code").subscribe({
      next:(data)=>{
        console.log(data)
        this.cancelFormCode()
        this.codeForm.reset()
        this.getAllCodes()
        this.alertService.success("Codigo creado correctamente")
      },error:(e)=>{
        this.alertService.error("Ocurrio un error al crear el codigo")
      }
    })}else{//se edita
      this.crudService.update(CODE,"code",this.actualId).subscribe({
        complete:()=>{
          this.actualId="";
          this.cancelFormCode()
          this.getAllCodes();
          this.codeForm.reset()
          this.alertService.success("Codigo editado correctamente")
        },error:(e)=>{
          this.alertService.error("Ocurrio un error al editar el codigo")
        }
      })


    }
  }

  search(){
    this.currentPage = 1;
    this.params=this.params.set('page', this.currentPage);
    this.params=this.params.set('search',this.searchQuery);
    console.log(this.params);
    this.getAllCodes();
  }


  getAllCodes(){
    this.crudService.getAllWithParams('code',this.params).subscribe({
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
        this.codes=data.docs;
        console.log(data);
      }
    })
  }

  showFormCode(){
    this.createCodeTitle='Crear Codigo';
    this.createCodeButton='Crear';
    this.formIsHidden=false;
  }
  showFormEditCode(id:any){
    this.actualId=id;
    this.createCodeTitle='Editar Codigo';
    this.createCodeButton='Editar';

    this.crudService.get("code",id).subscribe({
      next:(data)=>{
        this.codeForm.patchValue(data);
      }
    })

    this.formIsHidden=false;
  }
  cancelFormCode(){
    this.codeForm.reset()
    this.formIsHidden=true;
    this.actualId="";
  }

  searchCodeStatus(){
    this.currentPage = 1;
    this.params=this.params.set('page', this.currentPage);
    this.params=this.params.set('status',this.statusQuery);
    this.getAllCodes();
  }

  toggleCodeStatus(id:any){
    this.crudService.update(null,"code/status",id).subscribe({
      next:(data)=>{
        this.getAllCodes();
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
    this.getAllCodes()
  }

  removeCode(id:any){
    this.alertService.question('¿Seguro quieres borrar este Codigo?','Borrar','No borrar')
        .then((result) => {
      if (result.isConfirmed) {
        if(this.codes.length==1 && this.paginationData.prevPage!=null){
          this.currentPage=this.currentPage-1;
          this.params=this.params.set('page', this.currentPage);

        }

        this.crudService.delete(id,"code").subscribe({
          complete:()=>{
            console.log('code deleted');
            this.getAllCodes();
          },error:()=>{
            console.log('Error deleted code');
          }
        })
      } 
    }
    )
  }

}
