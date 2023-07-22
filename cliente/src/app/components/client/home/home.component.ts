import { animate, style, transition, trigger } from '@angular/animations';
import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NavbarServiceService } from 'src/app/services/navbar/navbar-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('swimAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(0)' }),
        animate('3s', style({ transform: 'translateY(-20px)' })),
        animate('3s', style({ transform: 'translateY(0)' }))
      ]),
      transition('swim => rest', [
        animate('3s', style({ transform: 'translateY(0)' }))
      ]),
      transition('rest => swim', [
        animate('3s', style({ transform: 'translateY(-20px)' })),
        
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  state = 'swim';

  constructor(private router:Router){}

  ngOnInit(): void {
    this.startAnimation();
    
  }

  

  startAnimation() {
    setInterval(() => {
      this.state = this.state === 'rest' ? 'swim' : 'rest';
    }, 3000);
  }

}
