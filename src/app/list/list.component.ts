import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  private leads: any = [];
  constructor(private dataService: DataService, private router: Router) {

   }

  ngOnInit() {
    this.dataService.getData('leads/' + this.dataService.getUserId()).subscribe(
      (resp: any) => {
        this.leads = resp.json();
      }
    );
  }

  anexarDoc (lead: number) {
    this.router.navigate(['/anexar/' + lead]);
  }

  verDet (lead: number) {
    this.router.navigate(['/det/' + lead]);
  }

}
