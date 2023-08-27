import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vefify2faComponent } from './vefify2fa.component';

describe('Vefify2faComponent', () => {
  let component: Vefify2faComponent;
  let fixture: ComponentFixture<Vefify2faComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Vefify2faComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vefify2faComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
