import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityComponent } from './security.component';
import { MaterialModule } from 'src/app/material/material.module';

describe('SecurityComponent', () => {
  let component: SecurityComponent;
  let fixture: ComponentFixture<SecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityComponent ],
      imports: [
        MaterialModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityComponent);
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
