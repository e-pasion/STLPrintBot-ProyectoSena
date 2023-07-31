import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertServiceService {

  constructor() { }


  success(msg:string){
    Swal.fire({
      icon: 'success',
      title:msg,
      showConfirmButton: false,
      timer: 2000
    
    })
  }

  warning(msg:string){
    Swal.fire({
      icon: 'warning',
      title:msg,
      showConfirmButton: false,
      timer: 2000
    
    })
  }

  warningTopEnd(msg:string){
    Swal.fire({
      icon: 'warning',
      title:"<p class='text-xl' >" + msg + "</p>",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 1000,
      position: 'top-end'

    
    })
  }

  loading(msg:string){
    Swal.fire({
      title:msg,
      showConfirmButton: false,
      timer: 1,
      didOpen: ()=>{
        Swal.showLoading()
        Swal.stopTimer()
      }
    })
  }

  terminateLoading(){
    Swal.resumeTimer()
  }

  error(msg:string){
    Swal.fire({
      icon: 'error',
      title: msg,
      showConfirmButton: false,
      timer: 2000
    })
  }
}
