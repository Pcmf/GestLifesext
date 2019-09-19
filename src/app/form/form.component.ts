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
  status = 10;
  motivocontacto = 12;
  primeiroTitular = true;
  sitfamiliares: any = [];
  relacoes: any = [];
  tiposdoc: any = [];
  nacionalidades: any [];
  fornecedorCode: number;
  userId: number;
  OCArr: any = [{}];
  ORArr: any = [{}];


  constructor(private data: DataService, private router: Router, private http: HttpClient) {
    this.fornecedorCode = data.getFornecedorCode();
    this.http.get('../../assets/nacionalidades.json').subscribe(
      (nac: any) => this.nacionalidades = nac
    );
    this.data.getData('getdata/cnf_relacaofamiliar').subscribe(
      (rel: any) => this.relacoes = rel
    );
    this.userId = data.getUserId();
    this.data.getData('getdata/cnf_sitfamiliar').subscribe(
      (resp: any) => {         this.sitfamiliares = resp;
        this.data.getData('getdata/cnf_tiposdoc').subscribe(
          (resp2: any) => this.tiposdoc = resp2
        );
      }
    );
  }

  saveForm(form) {
    console.log(form.value);
   // this.data.saveData('')
  }

  saveAndAnexa (form) {
      const obj = {
                  'status': 10,
                  'motivocontacto': 12,
                  'form': form.value
                 };
      this.data.saveData('processform', obj).subscribe(
        resp => console.log(resp)
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
