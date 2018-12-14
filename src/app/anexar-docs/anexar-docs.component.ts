import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anexar-docs',
  templateUrl: './anexar-docs.component.html',
  styleUrls: ['./anexar-docs.component.css']
})
export class AnexarDocsComponent implements OnInit {
  private documentos: any = [];
  private db64: any = [];
  private docline: any = [];
  private indice: number;
  private filename: string;
  private lead: number;
  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute ) {
    this.dataService.getData('docsnecessarios').subscribe(
      resp => {
        this.documentos = resp.json();
      }
    );
    this.route.paramMap.subscribe(
      param => this.lead = +param.getAll
    );
  }

  handleInputChange(e, id) {
    this.indice = id;
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    this.filename = file.name;
    const pattern = /pdf-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);

  }
  _handleReaderLoaded(e) {
    const reader = e.target;
    const obj: any = {};
    obj.id = this.indice;
    obj.nomefx = this.filename;
    obj.base64 = reader.result;
    this.docline.push(obj);
  }

  guardarDocs (form) {
    console.log(this.docline);
    this.dataService.saveData('savedocs/' + this.lead, this.docline)
      .subscribe( resp => {
        if (resp) {
          alert('Documentos guardados!');
          this.docline = [];
          this.router.navigate(['/list']);
        }
      });
  }

  limparDocs () {
    this.docline = [];
    this.router.navigate(['/anexar']);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => this.lead = +params.get('lead'));
  }

}
