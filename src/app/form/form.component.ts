import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent  {
  sitfamiliares: any = [];
  fornecedorCode: number;
  private userId: number;
  OCArr: any = [{}];
  ORArr: any = [{}];


  constructor(private loginService: DataService, private router: Router) {
    this.fornecedorCode = loginService.getFornecedorCode();
    this.userId = loginService.getUserId();
    this.loginService.getData('getdata/cnf_sitfamiliar').subscribe(
      resp => this.sitfamiliares = resp.json()
    );
  }

  saveAndAnexa (form) {
      this.loginService.saveData('leads/' + this.userId, form.value).subscribe(
        (resp: any) => {
          console.log(resp);
          if  (resp.status === 200) {
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
