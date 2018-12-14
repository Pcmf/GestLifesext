import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnexarDocsComponent } from './anexar-docs.component';

describe('AnexarDocsComponent', () => {
  let component: AnexarDocsComponent;
  let fixture: ComponentFixture<AnexarDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnexarDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnexarDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
