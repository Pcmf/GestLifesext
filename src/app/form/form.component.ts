import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  tf: any = [];
  status = 10;
  motivocontacto = 12;
  primeiroTitular = true;
  mesmaHabit = false;
  sitfamiliares: any = [];
  relacoes: any = [];
  tiposdoc: any = [];
  nacionalidades: any [];
  fornecedorCode: number;
  userId: number;
  OCArr: any = [{}];
  ORArr: any = [{}];

  ngOnInit () {
    if (sessionStorage.tempForm) {
      this.tf = JSON.parse(sessionStorage.tempForm);
      this.OCArr = JSON.parse(sessionStorage.tempOC);
      this.ORArr = JSON.parse(sessionStorage.tempOR);
    }
  }

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
    sessionStorage.tempForm = JSON.stringify(form.value);
    
    
    sessionStorage.tempOC = JSON.stringify(this.OCArr);
    sessionStorage.tempOR = JSON.stringify(this.ORArr);
    alert('Dados guardados temporariamente!');
  }

  saveAndAnexa (form) {
      const obj = {
                  'status': 10,
                  'motivocontacto': 12,
                  'form': form.value
                 };
      this.data.saveData('processform', obj).subscribe(
        resp => {
          console.log(resp);
          alert('Foi criada e submetida para analise uma lead com numero ' + resp );
          sessionStorage.tempForm = '';
          this.router.navigate(['/']);
        }
      );

  }

  goTo2Titular (form) {
    sessionStorage.tempForm = JSON.stringify(form.value);
    this.primeiroTitular = false;
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

  back() {
    this.router.navigate(['/']);
  }
}
