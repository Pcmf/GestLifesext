import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simula',
  templateUrl: './simula.component.html',
  styleUrls: ['./simula.component.css']
})
export class SimulaComponent implements OnInit {
  simulaSts = 'simula-closed';
  constructor() { }

  toggle(){
    this.simulaSts === 'simula-closed' ? this.simulaSts = 'simula-opened' :  this.simulaSts = 'simula-closed';
  }

  ngOnInit() {
  }

}
