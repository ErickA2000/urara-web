import { TestBed } from '@angular/core/testing';

import { TransferDataLocalService } from './transfer-data-local.service';

describe('TransferDataLocalService', () => {
  let service: TransferDataLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferDataLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
