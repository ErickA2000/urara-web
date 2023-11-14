import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAccountComponent } from './home-account.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AccountRoutingModule } from '../../account-routing.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeAccountComponent', () => {
  let component: HomeAccountComponent;
  let fixture: ComponentFixture<HomeAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAccountComponent ],
      imports: [
        MaterialModule,
        AccountRoutingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
