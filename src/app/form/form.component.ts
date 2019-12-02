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
  titulo: string;
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
  edit = false;
  p_lead: number;



  constructor(private data: DataService, private router: Router, private http: HttpClient, private route: ActivatedRoute) {
    this.fornecedorCode = data.getFornecedorCode();
    this.http.get('./assets/nacionalidades.json').subscribe(
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
    // Verificar se tem parametro no route
    this.route.paramMap.subscribe(
      param => {
        this.p_lead = +param.get('lead');
        if (this.p_lead) {
          this.edit = true;
          this.titulo = 'Dados do Cliente ' + this.p_lead;
          // Obter os dados do processo
          this.data.getData('processform/' + this.p_lead).subscribe(
            (dados: any) => {
              this.tf = dados.process;
              this.tf.profissao = this.tf.sector;
              this.tf.anoinicio = this.tf.desde;
              this.tf.mesinicio = this.tf.desdemes;
              this.tf.profissao2 = this.tf.sector2;
              this.tf.anoinicio2 = this.tf.desde2;
              this.tf.mesinicio2 = this.tf.desdemes2;
              this.tf.cpostal = this.tf.cp;
              this.tf.cpostal2 = this.tf.cp2;
              this.tf.desdeiban = this.tf.ibandesde;
              this.OCArr = dados.oc;
              this.ORArr = dados.or;
            }
          );
        } else {
          console.log('Sem parametro');
          this.edit = false;
          this.titulo = 'Registo de Novo cliente';

          if (sessionStorage.tempForm !== 'undefined' && sessionStorage.tempForm) {
            this.tf = JSON.parse(sessionStorage.tempForm);
            this.OCArr = JSON.parse(sessionStorage.tempOC);
            this.ORArr = JSON.parse(sessionStorage.tempOR);
          }
        }
      }
    );



  }

  ngOnInit () {

  }

  opcaoSegundoTitular(opc, form) {
    if (opc == 1) {
      this.goTo2Titular(form);
    }
  }

  saveForm(form) {
    sessionStorage.tempForm = JSON.stringify(form.value);
    sessionStorage.tempOC = JSON.stringify(this.OCArr);
    sessionStorage.tempOR = JSON.stringify(this.ORArr);
    alert('Dados guardados temporariamente!');
  }

  saveAndAnexa (form) {
      const obj = {
                  'status': 8,
                  'motivocontacto': 12,
                  'form': form.value
                 };
      this.data.saveData('processform', obj).subscribe(
        (resp: any) => {
          console.log(resp);
          if (Number.isInteger(+resp)) {
           // alert('Foi criada uma lead com numero ' + resp );
            this.clearTempForm();
            this.router.navigate(['/anexar/' + resp]);
          } else {
            alert('Houve um erro ao guardar o processo.\n Verifique os dados introduzidos e tente outra vez.');
          }

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

  limparForm() {
    this.tf = {};
/*     this.OCArr = {};
    this.ORArr = {}; */
    this.clearTempForm();
  }

  back() {
    this.router.navigate(['/list']);
  }

  private clearTempForm() {
    sessionStorage.removeItem('tempForm');
    sessionStorage.removeItem('tempOC');
    sessionStorage.removeItem('tempOR');
  }
}
