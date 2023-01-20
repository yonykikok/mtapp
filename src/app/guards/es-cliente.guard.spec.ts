import { TestBed } from '@angular/core/testing';

import { EsClienteGuard } from './es-cliente.guard';

describe('EsClienteGuard', () => {
  let guard: EsClienteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EsClienteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
