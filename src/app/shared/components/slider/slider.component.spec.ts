import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderComponent } from './slider.component';
import { MaterialModule } from 'src/app/material/material.module';
import { NgxGlideComponent, NgxGlideModule } from 'ngx-glide';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // declarations: [ SliderComponent ],
      imports: [
        MaterialModule,
        NgxGlideComponent, 
        NgFor, 
        NgIf,
        TitleCasePipe
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;

    component.data = [
      {
        link: "string",
        title: "string"
      }
    ]

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
