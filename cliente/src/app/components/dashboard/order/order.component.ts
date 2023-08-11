import { Component } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  statusToggle:any={
    inProcess:true,
    inSend:false,
    inFinished:false
  };

  changeStatus(status:String){
    Object.keys(this.statusToggle).map((key) => {
      this.statusToggle[key]=(key==status)?true:false;
      console.log(this.statusToggle[key]);
    });
  }

}
