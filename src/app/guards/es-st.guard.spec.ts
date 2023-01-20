import { TestBed } from '@angular/core/testing';

import { EsSTGuard } from './es-st.guard';

describe('EsSTGuard', () => {
  let guard: EsSTGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EsSTGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
