import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulaComponent } from './simula.component';

describe('SimulaComponent', () => {
  let component: SimulaComponent;
  let fixture: ComponentFixture<SimulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
