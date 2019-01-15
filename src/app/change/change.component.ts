import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class ChangeComponent implements OnInit {
  invalid2Pass = false;
  erro = false;
  u: any = {};
  private newData: any;
  constructor(private loginService: DataService, private router: Router) {
   // this.loginService.getUserData().subscribe(resp => {
    //  this.u = resp;
    //  console.log( this.u );
  //  });

  }

  ngOnInit() {
  }

  changePass(form) {
  if (form.pass1 === form.pass2) {
    this.invalid2Pass = false;
    // console.log(form.pass2);
    this.newData = {'newnome': form.nome, 'newusername': form.username, 'newpass': form.pass1, 'token': sessionStorage.getItem('token')};
   // this.loginService.changePassDB (this.newData);

    this.loginService.changePassDB(this.newData).subscribe(
      resp => {
        console.log(resp);
        sessionStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    );


  } else {
    this.invalid2Pass = true;
  }
}

}

