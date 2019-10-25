import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  leads: any = [];
  search: string;
  constructor(private dataService: DataService, private router: Router) {
    this.dataService.getData('leads/' + this.dataService.getUserId()).subscribe(
      (resp: any []) => {
        // inverter a lista
        const size = resp.length - 1;
        for (let i = 0; i < size; i++ ) {
          this.leads.push(resp.pop());
        }
      }
    );
   }

  ngOnInit() {
  }

  anexarDoc (lead: number) {
    this.router.navigate(['/anexar/' + lead]);
  }

  verDet (lead: number) {
    this.router.navigate(['/det/' + lead]);
  }

}
