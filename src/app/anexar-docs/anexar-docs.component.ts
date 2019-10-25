import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-anexar-docs',
  templateUrl: './anexar-docs.component.html',
  styleUrls: ['./anexar-docs.component.css']
})
export class AnexarDocsComponent implements OnInit {
  documentos: any = [];
  private tipodoc: number;
  private filename: string;
  lead: number;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute, private _sanitizer: DomSanitizer ) {

    this.route.paramMap.subscribe(
      param => {
        this.lead = +param.get('lead');
        this.dataService.getData('docsnec/' + this.lead).subscribe(
          resp => this.documentos = resp
        );
      }
    );
  }

  handleInputChange(e, id) {
    console.log(id);
    this.tipodoc = id;
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    this.filename = file.name;
    const pattern = /pdf-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    if ( file.size > 4000000 ) {
      alert('Ficheiro demasiado grande. Tem que ser inferior a 4Mb');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);

  }
  _handleReaderLoaded(e) {
    const reader = e.target;
    const obj: any = {};
    obj.id = this.tipodoc;
    obj.nomefx = this.filename;
    obj.base64 = reader.result;
    this.dataService.editData('savedocs/' + this.lead, obj)
      .subscribe( resp => {
        if (!resp) {
          this.loadDados();
        } else {
          alert('Erro');
          console.log(resp);
        }
      });
  }

  sendToAnalise() {
    const obj =  {lead: this.lead, status: 10};
    this.dataService.editData('upstatus/' + this.lead + '/10', obj).subscribe(
      resp => {
        alert('Enviado para analise');
        this.router.navigate(['/']);
      }
    )
  }


  deleteDoc (doc) {
    console.log(doc);
    this.dataService.deleteData('doc/' + this.lead + '/' + doc.linha).subscribe(
      resp0 => this.loadDados()
    );
  }


  ngOnInit() {
    this.route.paramMap.subscribe(params => this.lead = +params.get('lead'));
  }

  loadDados () {
    this.dataService.getData('docsp/' + this.lead).subscribe(
      resp => {
        this.documentos = resp;
      }
    );
  }

}
