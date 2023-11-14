import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBasicInfoComponent } from './update-basic-info.component';
import { MaterialModule } from 'src/app/material/material.module';

describe('UpdateBasicInfoComponent', () => {
  let component: UpdateBasicInfoComponent;
  let fixture: ComponentFixture<UpdateBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBasicInfoComponent ],
      imports: [
        MaterialModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
