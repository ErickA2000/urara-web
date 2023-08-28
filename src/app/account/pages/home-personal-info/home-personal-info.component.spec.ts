import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePersonalInfoComponent } from './home-personal-info.component';

describe('HomePersonalInfoComponent', () => {
  let component: HomePersonalInfoComponent;
  let fixture: ComponentFixture<HomePersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePersonalInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
