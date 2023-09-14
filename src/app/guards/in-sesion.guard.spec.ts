import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { inSesionGuard } from './in-sesion.guard';

describe('inSesionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => inSesionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
