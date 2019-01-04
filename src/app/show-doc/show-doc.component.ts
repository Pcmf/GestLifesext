import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-show-doc',
  templateUrl: './show-doc.component.html',
  styleUrls: ['./show-doc.component.css']
})
export class ShowDocComponent {
  lead: number;
  linha: number;
  imagePath: any;
  constructor(private dataService: DataService,
              private router: Router,
               private route: ActivatedRoute,
               private _sanitizer: DomSanitizer ) {

    this.route.paramMap.subscribe(
      param => {
        this.lead = +param.get('lead');
        this.linha = +param.get('linha');
        this.dataService.getData('doc/' + this.lead + '/' + this.linha).subscribe(
          (resp: any) => {
            const document = resp.json()[0];
           // console.log(document.fx64);
            this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + document.fx64 );
          }
        );
      }
    );
}

}
