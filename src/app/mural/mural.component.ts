import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { interval } from 'rxjs';
import { NavbarService } from '../navbar.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-mural',
  templateUrl: './mural.component.html',
  styleUrls: ['./mural.component.css'],
})
export class MuralComponent {
  private helper = new JwtHelperService;
  muralClass = 'mural-c';
  btnClass = 'mb-c';
  accoes = 'accoes-c';
  alertMsg = 'info';
  txtButton = '<<';
  userId: number;
  destino = 0;
  utilizadores: any = [];
  conversas: any = [];
  clicked = 0;
  visible = 'not-visible';
  msg: string;
  lastMsg: number;
  private timer = interval(30000);
  constructor(private dataService: DataService, private navService: NavbarService) {
    this.navService.navstate$.subscribe((state: any) => {
      this.lastMsg = 0;
      this.alertMsg = 'info';
      this.msg = '';
      this.userId = this.dataService.getUserId();
      this.timer.subscribe(
        resp => this.getMsg()
      );
      });
    // obter Lista dos utilizadores
    this.dataService.getData('users').subscribe(
      resp => this.utilizadores = resp
    );

    this.timer.subscribe(
      resp => this.getMsg()
    );

  }

  isLoggedIn() {
    const token = sessionStorage.getItem('token');
    if (token && this.helper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  enter() {
    // obter o userId
    

    // obter conversas
    this.getMsg();
  }

  toogle() {
    this.getMsg();
    this.muralClass === 'mural-c' ? this.muralClass = 'mural-o' : this.muralClass = 'mural-c';
    this.btnClass === 'mb-c' ? this.btnClass = 'mb-o' : this.btnClass = 'mb-c';
    this.txtButton === '<<' ? this.txtButton = '>>' : this.txtButton = '<<';
    this.accoes === 'accoes-c' ? this.accoes = 'accoes-o' : this.accoes = 'accoes-c';
    this.visible === 'not-visible' ? this.visible = 'visible' : this.visible = 'not-visible';
    this.alertMsg = 'info';
  }

  getMsg() {
    this.dataService.getData('mural/' + this.dataService.getUserId()).subscribe(
      resp => {
        if (resp != 'undefined' && resp) {
          this.conversas = resp;
          const actualMsg = this.conversas[this.conversas.length - 1].id;
          if (this.lastMsg !== 0 && this.lastMsg !== actualMsg) {
            this.alertMsg = 'warning';
          }
          this.lastMsg = actualMsg;
        }

      }
    );
  }

  selectDestino(conv) {
    if (!this.clicked || this.clicked !== conv.id) {
      this.clicked = conv.id;
      conv.origem !== this.userId ? this.destino = conv.origem : this.destino = conv.destino;
    } else {
      this.clicked = 0;
      this.destino = 0;
    }
  }

  enviarPara(destino, f) {
    this.msg = '';
    const obj = { 'origem': this.userId, 'destino': destino, 'assunto': f.msg };
    this.dataService.saveData('mural', obj).subscribe(
      resp => {
        this.msg = '';
        this.getMsg();
        this.clicked = 0;
        this.destino = 0;
      }
    );
  }
}
