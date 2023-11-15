import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwofaComponent } from './twofa.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('TwofaComponent', () => {
  let component: TwofaComponent;
  let fixture: ComponentFixture<TwofaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwofaComponent ],
      imports: [
        MaterialModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwofaComponent);
    component = fixture.componentInstance;

    component.dataUser = {
      _id: "string",
      nombre: "string",
      telefono: {
        codigo_area: "",
        numero: ""
      },
      email: "string",
      username: "string",
      emailverified: true,
      roles: [
        {
          _id: "",
          nombre: ""
        }
      ],
      verify2fa: {
        estado: false,
        metodos: [],
        code_access: ""
      },
      direcciones: []
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
