import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetLeadComponent } from './det-lead.component';

describe('DetLeadComponent', () => {
  let component: DetLeadComponent;
  let fixture: ComponentFixture<DetLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
