import { TestBed } from '@angular/core/testing';

import { CoeffService } from './coefficients.service';

describe('TestService', () => {
  let service: CoeffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoeffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
