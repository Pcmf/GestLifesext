import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Url } from 'url';

@Component({
  selector: 'app-show-doc',
  templateUrl: './show-doc.component.html',
  styleUrls: ['./show-doc.component.css']
})
export class ShowDocComponent {
  lead: number;
  linha: number;
  fxNome: string;
  imagePath: Url = null;
  private data: any;
  private fileName: string;
  constructor(private dataService: DataService,
               private route: ActivatedRoute,
               private _sanitizer: DomSanitizer ) {

    this.route.paramMap.subscribe(
      param => {
        this.lead = +param.get('lead');
        this.linha = +param.get('linha');
        this.dataService.getData('doc/' + this.lead + '/' + this.linha).subscribe(
          (resp: any) => {
            const document = resp.json()[0];
            this.fxNome = document.nomedoc;
            this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + document.fx64);
          }
        );
      }
    );
}

}
