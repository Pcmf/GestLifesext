import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-det-lead',
  templateUrl: './det-lead.component.html',
  styleUrls: ['./det-lead.component.css']
})
export class DetLeadComponent implements OnInit {
  public lead: number;
  private userId: number;
  public elem: any = [];
  public submissoes: any = [];
  public rejeicoes = '';
  constructor(private route: ActivatedRoute, private dataService: DataService) {
        this.userId = this.dataService.getUserId();
        // obter o parametro passado no url e os dados da lead
        this.route.paramMap.subscribe(
          param => {
             this.lead = +param.get('lead');
             this.dataService.getData('leads/' + this.userId + '/' + this.lead ).subscribe(
               (resp: any) => {
                 this.elem = resp.lead;
                 this.submissoes = resp.submissoes;
                 const rej = resp.rejeicoes;
                 rej.forEach(ln => {
                   this.rejeicoes += ln.data + ' -->   ' + ln.motivo + ';   ' + ln.obs + ';  ' + ln.outro + '\n';
                 });
               }
             );
          }
        );
  }

  ngOnInit() {
  }

}
