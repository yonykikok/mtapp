import { TestBed } from '@angular/core/testing';

import { EsAdminGuard } from './es-admin.guard';

describe('EsAdminGuard', () => {
  let guard: EsAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EsAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
