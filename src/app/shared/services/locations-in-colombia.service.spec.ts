import { TestBed } from '@angular/core/testing';

import { LocationsInColombiaService } from './locations-in-colombia.service';

describe('LocationsInColombiaService', () => {
  let service: LocationsInColombiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationsInColombiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
