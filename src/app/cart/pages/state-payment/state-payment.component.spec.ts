import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatePaymentComponent } from './state-payment.component';

describe('StatePaymentComponent', () => {
  let component: StatePaymentComponent;
  let fixture: ComponentFixture<StatePaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatePaymentComponent]
    });
    fixture = TestBed.createComponent(StatePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
