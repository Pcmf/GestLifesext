import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-det',
  templateUrl: './det.component.html',
  styleUrls: ['./det.component.css']
})
export class DetComponent {
  sitfamiliares: any =  [];
  sitprofissionais: any = [];
  tiposhabitacao: any = [];
  segundoProponente: boolean;
  isConjugue: boolean;
  OCArr: any = [{}];
  ORArr: any = [{}];
  lead: number;
  elem: any = [];
  fornecedorCode: number;
  private userId: number;

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) {
    this.userId = this.dataService.getUserId();
    // Obter os estados civis
    this.dataService.getData('getdata/cnf_sitfamiliar').subscribe(
      resp => this.sitfamiliares = resp.json()
    );
    // Obter as situações profissionais
    this.dataService.getData('getdata/cnf_sitprofissional').subscribe(
      resp => this.sitprofissionais = resp.json()
    );
    // Obter os tipos de habitacao
    this.dataService.getData('getdata/cnf_tipohabitacao').subscribe(
      resp => this.tiposhabitacao = resp.json()
    );
    // obter o parametro passado no url e os dados da lead
    this.route.paramMap.subscribe(
      param => {
         this.lead = +param.get('lead');
         this.dataService.getData('leads/' + this.userId + '/' + this.lead ).subscribe(
           (resp: any) => {
             this.elem = resp.json()[0].lead;
             this.elem.parentesco2 ? this.segundoProponente = true : this.segundoProponente = false;
             this.elem.parentesco2 == 'Conjugue' ? this.isConjugue = true : this.isConjugue = false;

            this.OCArr = resp.json()[0].oc;
            if (!this.OCArr || this.OCArr.length < 1)  {
              this.OCArr = [];
              this.addLineOutrosCreditos();
            }
            this.ORArr = resp.json()[0].or;
            if (!this.ORArr || this.ORArr.length < 1) {
              this.ORArr = [];
              this.addLineOutrosRendimentos();
            }
           }
         );
      }
    );
   }

  editar (form) {
    this.dataService.editData('upleads/' + this.lead, form.value).subscribe(
      (resp: any) => {
        if  (resp.status === 200) {
         this.router.navigate(['/anexar/' + this.lead ]);
        } else  {
          alert('Erro nos dados');
        }
      }
    );
  }

    // Outros creditos
    addLineOutrosCreditos () {
      this.OCArr.push({});
    }
    removeLineOutrosCreditos (i) {
      this.OCArr.splice(i, 1);
    }
    // Outros rendimentos
    addLineOutrosRendimentos () {
      this.ORArr.push({});
    }
    removeLineOutrosRendimentos (i) {
      this.ORArr.splice(i, 1);
    }
}
