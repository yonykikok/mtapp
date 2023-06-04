import { TestBed } from '@angular/core/testing';

import { FormsValidatorsService } from './forms-validators.service';

describe('FormsValidatorsService', () => {
  let service: FormsValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
