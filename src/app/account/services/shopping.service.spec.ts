import { TestBed } from '@angular/core/testing';

import { ShoppingService } from './shopping.service';
import { HttpClientModule } from '@angular/common/http';

describe('ShoppingService', () => {
  let service: ShoppingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(ShoppingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
