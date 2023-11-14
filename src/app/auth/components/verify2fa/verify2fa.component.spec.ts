import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Verify2faComponent } from './verify2fa.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('Verify2faComponent', () => {
  let component: Verify2faComponent;
  let fixture: ComponentFixture<Verify2faComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Verify2faComponent ],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Verify2faComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
