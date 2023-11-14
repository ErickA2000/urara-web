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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
