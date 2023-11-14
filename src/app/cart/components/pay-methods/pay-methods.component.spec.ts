import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayMethodsComponent } from './pay-methods.component';
import { MaterialModule } from 'src/app/material/material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('PayMethodsComponent', () => {
  let component: PayMethodsComponent;
  let fixture: ComponentFixture<PayMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayMethodsComponent ],
      imports: [
        MaterialModule,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA, useValue: {}
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
