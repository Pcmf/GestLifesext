import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-det-lead',
  templateUrl: './det-lead.component.html',
  styleUrls: ['./det-lead.component.css']
})
export class DetLeadComponent implements OnInit {
  lead: number;
  userId: number;
  elem: any = [];
  submissoes: any = [];
  constructor(private route: ActivatedRoute, private dataService: DataService) {
        this.userId = this.dataService.getUserId();
        // obter o parametro passado no url e os dados da lead
        this.route.paramMap.subscribe(
          param => {
             this.lead = +param.get('lead');
             this.dataService.getData('leads/' + this.userId + '/' + this.lead ).subscribe(
               (resp: any) => {
                 this.elem = resp.json()[0].lead;
                 this.submissoes = resp.json().submissoes;
                 console.log(this.submissoes);
               }
             );
          }
        );
  }

  ngOnInit() {
  }

}
