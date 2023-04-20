import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottonSheetFilterComponent } from './botton-sheet-filter.component';

describe('BottonSheetFilterComponent', () => {
  let component: BottonSheetFilterComponent;
  let fixture: ComponentFixture<BottonSheetFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottonSheetFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottonSheetFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
