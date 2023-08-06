import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Color } from 'src/app/models/Color';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { CrudServiceService } from 'src/app/services/crud/crud-service.service';
import { SweetAlertServiceService } from 'src/app/services/sweetAlert/sweet-alert-service.service';
declare const StlViewer:any;


@Component({
  selector: 'app-create-color',
  templateUrl: './create-color.component.html',
  styleUrls: ['./create-color.component.css']
})
export class CreateColorComponent implements OnInit{

  @ViewChild('stlCont', { static: true }) stlCont!:ElementRef;
  stl_viewer:any;
  colorForm:FormGroup
  selectColor: string= "#70f0ae";
  id: string | null;
  createColorTitle='Crear Color';
  createColorButton='Crear';

  constructor(private fb:FormBuilder,private router:Router,private aRoute:ActivatedRoute,private alertService:SweetAlertServiceService, private crudService:CrudServiceService){
    this.colorForm=this.fb.group({
      name:['',Validators.required],
      code:['',[Validators.required,Validators.minLength(7),Validators.maxLength(7),Validators.pattern(/^#[0-9A-Fa-f]{6}$/)]],
    })
    this.id=this.aRoute.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {

    if(!this.id){
      this.colorForm.patchValue({
        code: this.selectColor
      });
      this.initStlViewer();
    }else{
      this.createColorTitle='Editar Color';
      this.createColorButton='Editar';
      this.getColor(this.id);
    }
  }

  initStlViewer() {
    console.log(this.selectColor);
    this.stl_viewer = new StlViewer(this.stlCont.nativeElement,{models: [{ id: 0, filename: "dino.stl",color:this.selectColor,rotationx:Math.PI*1.5 }],auto_rotate:true});
  }

  
  createColor(){
    const COLOR = new Color(this.colorForm.get('name')?.value,
    this.colorForm.get('code')?.value)

    if(!this.id){
    this.crudService.save(COLOR,"color").subscribe({
      next:(data)=>{
        this.colorForm.patchValue({
          code: this.selectColor
        });
        console.log(data)
        this.colorForm.reset()
        this.alertService.success("Color creado correctamente")
      },error:(e)=>{
        this.alertService.error("Ocurrio un error al crear el Color")
      }
    })}else{//se edita
      this.crudService.update(COLOR,"color",this.id).subscribe({
        complete:()=>{
          this.colorForm.patchValue({
            code: this.selectColor
          });
          this.colorForm.reset()
          this.alertService.success("Color editado correctamente")
          this.router.navigate(['/dashboard/color']);
        },error:(e)=>{
          this.alertService.error("Ocurrio un error al editar el Color")
        }
      })
    }
  }


  changeColor(color:string){
    this.selectColor=color;
    this.colorForm.get('code')!.setValue(color);
    this.colorForm.get('code')!.markAsTouched(); 
    this.stl_viewer.set_color(0,color);
  }


  getColor(id:any){
    this.crudService.get("color",id).subscribe({
      next:(data)=>{
        this.colorForm.patchValue(data);
        this.selectColor=data.code;
        console.log(this.selectColor);
        this.initStlViewer();
      }
    })
  }

}
