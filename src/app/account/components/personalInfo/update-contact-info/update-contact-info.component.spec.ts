import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContactInfoComponent } from './update-contact-info.component';
import { MaterialModule } from 'src/app/material/material.module';

describe('UpdateContactInfoComponent', () => {
  let component: UpdateContactInfoComponent;
  let fixture: ComponentFixture<UpdateContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateContactInfoComponent ],
      imports: [
        MaterialModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateContactInfoComponent);
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
