import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMyBuysComponent } from './home-my-buys.component';
import { MaterialModule } from 'src/app/material/material.module';

describe('HomeMyBuysComponent', () => {
  let component: HomeMyBuysComponent;
  let fixture: ComponentFixture<HomeMyBuysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMyBuysComponent ],
      imports: [
        MaterialModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMyBuysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
