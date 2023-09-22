import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {

  goWP(message:string){
    window.open(`https://wa.me/3003735155?text=${encodeURIComponent(message)}`, "_blank");
}

}
