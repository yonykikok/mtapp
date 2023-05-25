import { TestBed } from '@angular/core/testing';

import { FuncionesUtilesService } from './funciones-utiles.service';

describe('FuncionesUtilesService', () => {
  let service: FuncionesUtilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncionesUtilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
