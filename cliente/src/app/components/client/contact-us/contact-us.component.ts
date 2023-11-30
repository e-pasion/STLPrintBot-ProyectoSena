import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  goWP(message:string){
    window.open(`https://wa.me/3003735155?text=${encodeURIComponent(message)}`, "_blank");
}

openLink(link:string){
  window.open(link, "_blank");
}

}
