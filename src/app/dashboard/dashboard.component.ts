import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private user: number;
  submetidos: number;
  pendentes: number;
  aprovados: number;
  financiados: number;
  recusados: number;
  constructor(private dataService: DataService) {
      this.user = this.dataService.getUserId();
    //  console.log(this.user);
      this.getDados();
   }

  ngOnInit() {
  }



  getDados () {
    this.dataService.getData('dashboard/' + this.user).subscribe(
      resp => {
      //  console.log(resp.json());
        this.submetidos = resp[0].submetidos;
        this.pendentes = resp[1].pendentes;
        this.aprovados = resp[2].aprovados;
        this.financiados = resp[3].financiados;
        this.recusados = resp[4].recusados;
      }
    );
  }
}
