import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetComponent } from './det.component';

describe('DetComponent', () => {
  let component: DetComponent;
  let fixture: ComponentFixture<DetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
