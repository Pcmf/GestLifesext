import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent  {
  primeiroTitular = true;
  sitfamiliares: any = [];
  relacoes: any = [];
  tiposdoc: any = [];
  nacionalidades: any [];
  fornecedorCode: number;
  private userId: number;
  OCArr: any = [{}];
  ORArr: any = [{}];


  constructor(private loginService: DataService, private router: Router, private http: HttpClient) {
    this.fornecedorCode = loginService.getFornecedorCode();
    this.http.get('../../assets/nacionalidades.json').subscribe(
      (nac: any) => this.nacionalidades = nac
    );
    this.loginService.getData('getdata/cnf_relacaofamiliar').subscribe(
      (rel: any) => this.relacoes = rel
    );
    this.userId = loginService.getUserId();
    this.loginService.getData('getdata/cnf_sitfamiliar').subscribe(
      resp => {         this.sitfamiliares = resp;
        this.loginService.getData('getdata/cnf_tiposdoc').subscribe(
          resp2 => this.tiposdoc = resp2
        );
      }
    );
  }

  saveAndAnexa (form) {
    const obj = {'status': 10, 'motivocontacto': 12, 'form': form.value};
      this.loginService.saveData('leads/' + this.loginService.getUserId(), obj).subscribe(
        (resp: any) => {
          console.log(resp);
          if  (resp.status === 200 && resp._body !== 'NaN') {
           this.router.navigate(['/anexar/' + +resp._body ]);
           // console.log(resp);
          } else  {
            alert('Erro nos dados');
          }
        }
      );
  }

  cancelar () {
    this.router.navigate(['/']);
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
