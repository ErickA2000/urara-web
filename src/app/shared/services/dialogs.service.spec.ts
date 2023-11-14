import { TestBed } from '@angular/core/testing';

import { DialogsService } from './dialogs.service';
import { MaterialModule } from 'src/app/material/material.module';

describe('DialogsService', () => {
  let service: DialogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ]
    });
    service = TestBed.inject(DialogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
