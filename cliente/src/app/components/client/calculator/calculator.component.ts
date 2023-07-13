import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Color } from 'src/app/models/Color';

import { changeWidth0To100 } from 'src/app/utils/animation';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudServiceService } from 'src/app/services/crud/crud-service.service';
import { StlServiceService } from 'src/app/services/stl/stl-service.service';
import { SweetAlertServiceService } from 'src/app/services/sweetAlert/sweet-alert-service.service';
import { FileServiceService } from 'src/app/services/file/file-service.service';
declare const StlViewer:any;


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  animations: [changeWidth0To100]
})
export class CalculatorComponent implements OnInit {
  defaultColor:string="#2196f3";

  scalePercentaje:number=100;
  scale=1;
  maxScale=120;
  file:any;
  pathFile:string="";
  dataUrl:any;

  stlData={//en este objeto se guardaran los datos que se le enviaran al backend
    color:"",
    fill:100,
    tamX:0,
    tamY:0,
    tamZ:0
  };

  stlContainerIsHidden:boolean=true;
  loadingIsHidden:boolean=false;
  settingIsHidden:boolean=false;
  priceIsHidden:boolean=true;
  stl_viewer:any=null;
  selectColor:any;
  cameraData:any;
  colors:Color[]=[];

  @ViewChild('stlContainer',{static:true}) stlContainer!:ElementRef<HTMLDivElement>;
  id: string | null;
  price: number=0;

  constructor(private stlService:StlServiceService,private sweetAlertService:SweetAlertServiceService, private crudService:CrudServiceService, private fileService:FileServiceService, private aRoute:ActivatedRoute){
    this.id=this.aRoute.snapshot.paramMap.get('id');
  };

  ngOnInit(): void {
     this.getAllColors()

  }


  getAllColors(){
    this.crudService.getAll(`color`).subscribe({
      next:(data)=>{
        this.colors=data;
        if (this.colors.length > 0) {
          this.stlData.color = this.colors[0].code; // Establece el primer color como valor inicial
        }
      },
      error:(e)=>console.error(e),
      complete:()=>console.log(this.colors)
    })
  }

  changeColor(){//codigo para cambiar el color
    this.stl_viewer.set_color(2,this.stlData.color);
  }




  handleDrop(event: DragEvent) {//codigo para cuando se recibe el archivo por medio de drag an drop
    event.preventDefault();
    let stlFile = event.dataTransfer?.files[0];
    this.processSTL(stlFile);
  }

  handleFileUpload(stlInput?: any) {//codigo para cuando se recibe el archivo por medio de input
    let stlFile = stlInput.files[0];
    this.processSTL(stlFile);
  }

  processSTL(stlFile:any){
    if(this.fileService.validateSTL(stlFile)){//si el archivo es un stl valido haga esto
      this.stlContainerIsHidden=false;
      this.file=stlFile;
      if(this.stl_viewer){
        this.stl_viewer.add_model({id: 2, local_file:stlFile,color:this.stlData.color,rotationx:Math.PI*1.5});
      }else{
        this.loadStlViewer(stlFile);
      }
    }else{
      this.sweetAlertService.error("El archivo subido no es valido")

    }
  }

  loadStlViewer(stlFile:any){ //codigo para cuando cargo el stl
    this.stl_viewer = new StlViewer(this.stlContainer.nativeElement,{models: [{ id:0, filename:"cube3.stl" },{id: 2, local_file:stlFile,color:this.stlData.color,rotationx:Math.PI*1.5}],bgcolor:"#333333",allow_drag_and_drop:true,all_loaded_callback: ()=>{
      this.loadingIsHidden=true;
      this.settingIsHidden=false;

      let fileData=this.stl_viewer.get_model_info(2); 
      this.stl_viewer.set_position(2, 0,-((249/2)-(fileData.dims.z/2)), 0);
      this.cameraData=this.stl_viewer.get_camera_state();
      this.cameraData.target.y=-((249/2)-(fileData.dims.z/2));//cambia el target para que la camara siga al modelo y no al contenedor
      this.cameraData.position.y=-46.13839012641881//mueve la posicion de la camara para mejorar la visibilidad
      this.stl_viewer.set_camera_state(this.cameraData);
      this.stlData.tamY= fileData.dims.y
      this.stlData.tamX= fileData.dims.x
      this.stlData.tamZ= fileData.dims.z
      this.getMaxScale();
    }});
  }

  removeStlViewer(){
    this.stl_viewer.set_opacity(0, 1);

    this.priceIsHidden=true;
    this.settingIsHidden=false;
    this.stl_viewer.remove_model(2);
    this.loadingIsHidden=false;
    this.stlContainerIsHidden=true;
    this.stl_viewer.set_camera_state(this.cameraData);

    //reiniciar los campos del form de settings
    this.stlData.fill=100;
    this.stlData.color = this.colors[0].code;
    this.scalePercentaje=100;
    this.scale=1;


  }

  changeSettings(){
    this.stl_viewer.set_opacity(0, 1);
    this.priceIsHidden=true;
    this.settingIsHidden=false;
  }



  getCotization(){
    this.stl_viewer.set_opacity(0, 0);

    this.sweetAlertService.loading("Calculando Precio...");
    this.stlService.cotization(this.file,this.stlData.fill).subscribe({
      next:(data)=>{
        this.price=data.price.toFixed(1);
      },error:(e)=>{
        this.sweetAlertService.terminateLoading()
        console.log(e);
      },complete:()=>{
        this.sweetAlertService.terminateLoading()
        this.settingIsHidden=true;
        this.priceIsHidden=false;
      }
    })
  }

   async stlAddCart(){
      this.dataUrl= this.stl_viewer.renderer.domElement.toDataURL("image/png")
      this.sweetAlertService.loading("Añadiendo al carrito...");
      this.stlService.purchaseStl(this.file,this.stlData.fill,this.dataUrl,this.stlData.color).subscribe({
        next:(data)=>{
          console.log(data);
        },error:(e)=>{
          this.sweetAlertService.terminateLoading()
          console.log(e);
        },complete:()=>{
          this.sweetAlertService.terminateLoading()
          this.sweetAlertService.success("El producto fue añadido al carrito correctamente")
          this.removeStlViewer();
        }
      })
  }





  warningNoSTL(){
    this.sweetAlertService.warningTopEnd("Debes subir un archivo STL antes de elegir.")
  }
 
   getMaxScale(){
    let scaleX=220/this.stlData.tamX;
    let scaleY=250/this.stlData.tamY;
    let scaleZ=220/this.stlData.tamZ;
    this.maxScale=(Math.min(scaleX,scaleY,scaleZ))*100;
}

  scaleModel(){
    this.scale=this.scalePercentaje/100
    this.stl_viewer.set_scale(2, this.scale,this.scale,this.scale);
    this.stl_viewer.set_position(2, 0,-((249/2)-((this.stlData.tamZ*this.scale)/2)), 0)
    // aqui lo que se hace es que cada que cambie de tamaño, se sobreescriba el archivo con el nuevo tamaño
    // para que se actualice el volumen
    const modelBinaryData = this.stl_viewer.get_stl_bin(2);
    const blob = new Blob([modelBinaryData], { type: 'application/octet-stream' });
    this.file = new File([blob], 'modelo.stl', { type: 'application/octet-stream' });

  }


  handleDragOver(event: DragEvent) {//codigo para prevenir el comportamiento por defecto al arrastrar un archivo
    event.preventDefault();
  }

}
