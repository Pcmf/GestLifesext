import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-det',
  templateUrl: './det.component.html',
  styleUrls: ['./det.component.css']
})
export class DetComponent implements OnInit {
  private lead: number;
  private elem: any = [];
  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(
      param => this.lead = this.lead = +param.get('lead')
    );
    console.log(this.lead);
   }

  ngOnInit() {
  }

}
