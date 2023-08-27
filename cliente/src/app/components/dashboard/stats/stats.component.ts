import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare const StlViewer:any;


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  @ViewChild('stlCont', { static: true }) stlCont!:ElementRef;
  stl_viewer:any;


  ngOnInit(): void {
    this.stl_viewer = new StlViewer(this.stlCont.nativeElement,{models: [{ id: 0, filename: "stats.obj",color:'#ffffff'}],auto_rotate:true});
  }

}
