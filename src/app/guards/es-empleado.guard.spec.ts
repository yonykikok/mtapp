import { TestBed } from '@angular/core/testing';

import { EsEmpleadoGuard } from './es-empleado.guard';

describe('EsEmpleadoGuard', () => {
  let guard: EsEmpleadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EsEmpleadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
