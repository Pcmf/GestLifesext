import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NavbarService } from './navbar.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private helper = new JwtHelperService;

  constructor(private http: Http, private navbarService: NavbarService) { }

  /**  */
  getData ( params) {
    return this.http.get('http://localhost/sisleads/SiSLeadsRest/' + params);
  }

  saveData (path: string, obj: any) {
    return this.http.post('http://localhost/sisleads/SiSLeadsRest/' + path, JSON.stringify(obj));
    // incluir uma forma de notificar que os dados foram inseridos ou erro
  }

  editData (path: string, obj: any) {
    return this.http.put('http://localhost/sisleads/SiSLeadsRest/' + path, JSON.stringify(obj));
    // incluir uma forma de notificar que os dados foram inseridos ou erro
  }

  deleteData (path: string) {
    return this.http.delete('http://localhost/sisleads/SiSLeadsRest/' + path );
  }

  checkuser (credenciais) {
    return this.http.post('http://localhost/sisleads/SiSLeadsRest/login',
        JSON.stringify(credenciais))
        .pipe(
          map((response: any) => {
         //   console.log(response._body);
            if ( response._body && this.helper.decodeToken(response._body).tipo === 'GExterno') {
              sessionStorage.setItem('token', response._body);
              this.navbarService.setNavState(this.helper.decodeToken(response._body));
              return true;
            } else {
              return false;
            }
        })

        );
  }



  logout() {
    sessionStorage.removeItem('token');
  }

  isLoggedIn() {
      const token = sessionStorage.getItem('token');
      if ( token && this.helper.isTokenExpired(token)) {
        return true;
      } else {
        return false;
      }
  }

  changePassDB (credenciais) {
    return this.http.put('http://localhost/SiSLeadsRest/change',
       JSON.stringify(credenciais))
       .pipe(
         map((response: any) => {
           if ( response._body ) {
             sessionStorage.setItem('token', response._body);
             //
             this.navbarService.setNavState(this.helper.decodeToken(response._body));
             return true;
           } else {
             return false;
           }
         })
       );
 }

  getUserId () {
    const helper = new JwtHelperService;
    return helper.decodeToken(sessionStorage.getItem('token')).id;
  }
  getFornecedorCode () {
    const helper = new JwtHelperService;
    return helper.decodeToken(sessionStorage.getItem('token')).fornecedor;
  }

}
