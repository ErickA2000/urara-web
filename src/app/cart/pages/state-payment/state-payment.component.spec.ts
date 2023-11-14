import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatePaymentComponent } from './state-payment.component';
import { MaterialModule } from 'src/app/material/material.module';

describe('StatePaymentComponent', () => {
  let component: StatePaymentComponent;
  let fixture: ComponentFixture<StatePaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatePaymentComponent],
      imports: [
        MaterialModule
      ]
    });
    fixture = TestBed.createComponent(StatePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
